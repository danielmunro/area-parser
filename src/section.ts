import Node from "./node"
import CharacterValue from "./token/characterValue"
import SubsectionToken from "./token/subsectionToken"
import Token from "./token/token"

export default class Section {
  private static readonly endCursor = [" ", "\n"]
  private position: number
  private first = true
  private data: string

  constructor(
    public readonly name: string,
    public readonly header: Token,
    public readonly tokens: Token[],
    public readonly isRepeatable: boolean,
    public readonly endRepeatDelimiter: string) {}

  public getNodes(data: string, position: number): Node[] {
    this.data = data
    this.position = position
    const nodes = []
    if (this.first) {
      nodes.push(this.parseToken(this.header))
      this.first = false
    }
    this.tokens.forEach(token => {
      if (token instanceof SubsectionToken) {
        nodes.push(...this.parseSubsection(token))
        return
      }
      nodes.push(...this.parseToken(token))
    })
    return nodes
  }

  public getPosition(): number {
    return this.position
  }

  private parseSubsection(token) {
    const nodes = []
    while (this.shouldContinueSubsectionTokenization(token)) {
      token.tokens.forEach(subsectionToken =>
        nodes.push(...this.parseToken(subsectionToken)))
    }
    return nodes
  }

  private shouldContinueSubsectionTokenization(token) {
    const nextPart = this.getNextPart()
    return nextPart.indexOf(token.getStartDelimiter()) === 0 && nextPart !== this.endRepeatDelimiter
  }

  private proceedToNextValue() {
    while (Section.endCursor.indexOf(this.data[this.position]) > -1) {
      this.position++
    }
  }

  private getNextPart() {
    this.proceedToNextValue()
    let end = this.data.indexOf("\n", this.position)
    if (end === -1) {
      end = this.data.length
    }
    return this.data.substring(this.position, end)
  }

  private throwTokenizeEndDelimiterError(token: Token, endDelimiter: string) {
    throw new Error(`missing end "${endDelimiter}", ${token.constructor.name} in section ${this.name}`)
  }

  private parseToken(token: Token): Node[] {
    // setup
    this.proceedToNextValue()
    const nodes = []
    const endDelimiter = this.getEndDelimiter(token)
    const end = this.calculateEndDelimiterPosition(token, endDelimiter)

    // add new node
    nodes.push(
      new Node(token, this.data.substring(this.position + token.getStartDelimiter().length, end).trim()))

    // increment cursor
    this.position = end + endDelimiter.length

    // recurse if called for
    if (token.isRepeatable() && this.isStillTokenizing(token)) {
      nodes.push(...this.parseToken(token))
    }

    return nodes
  }

  private calculateEndDelimiterPosition(token: Token, endDelimiter: string): number {
    const end = this.data.indexOf(endDelimiter, this.position)

    // sanity checks
    if (end === -1) {
      this.throwTokenizeEndDelimiterError(token, endDelimiter)
    }
    if (end === this.position) {
      return end + 1 - Math.min(endDelimiter.length, 1)
    }

    return end
  }

  private getEndDelimiter(token: Token) {
    return this.getDelimiter(token.getEndDelimiters())
  }

  private getEndRepeatDelimiter(token: Token) {
    return this.getDelimiter(token.getEndRepeatDelimiters())
  }

  private getDelimiter(delimiters: string[]) {
    return (delimiters.sort((a, b) => this.compare(a, b)))[0]
  }

  private compare(a: string, b: string) {
    const posA = this.data.indexOf(a, this.position)
    const posB = this.data.indexOf(b, this.position)

    if (posA === -1) {
      return 1
    }
    if (posB === -1) {
      return -1
    }

    return posA - posB
  }

  private isStillTokenizing(token: Token): boolean {
    return this.data.indexOf(this.getEndRepeatDelimiter(token), this.position) > this.position
  }
}

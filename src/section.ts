import Node from "./node"
import CharacterValue from "./token/characterValue"
import SubsectionToken from "./token/subsectionToken"
import Token from "./token/token"

export default class Section {
  private static readonly endCursor = [" ", "\n"]
  private position: number
  private first = true

  constructor(
    public readonly name: string,
    public readonly header: Token,
    public readonly tokens: Token[],
    public readonly isRepeatable: boolean,
    public readonly endRepeatDelimiter: string) {}

  public getNodes(data: string, position: number): Node[] {
    this.position = position
    const nodes = []
    if (this.first) {
      nodes.push(this.parseToken(this.header, data))
      this.first = false
    }
    this.tokens.forEach(token => {
      if (token instanceof SubsectionToken) {
        nodes.push(...this.parseSubsection(token, data))
        return
      }
      const createdNodes = this.parseToken(token, data)
      nodes.push(...createdNodes)
    })
    return nodes
  }

  public getPosition(): number {
    return this.position
  }

  private parseSubsection(token, data) {
    const nodes = []
    while (this.shouldContinueSubsectionTokenization(token, data)) {
      token.tokens.forEach(subsectionToken =>
        nodes.push(...this.parseToken(subsectionToken, data)))
    }
    return nodes
  }

  private shouldContinueSubsectionTokenization(token, data) {
    const nextPart = this.getNextPart(data)
    return nextPart.indexOf(token.getStartDelimiter()) === 0 && nextPart !== this.endRepeatDelimiter
  }

  private proceedToNextValue(data: string) {
    while (Section.endCursor.indexOf(data[this.position]) > -1) {
      this.position++
    }
  }

  private getNextPart(data: string) {
    this.proceedToNextValue(data)
    let end = data.indexOf("\n", this.position)
    if (end === -1) {
      end = data.length
    }
    return data.substring(this.position, end)
  }

  private throwTokenizeEndDelimiterError(token: Token, endDelimiter: string) {
    throw new Error(`missing end "${endDelimiter}", ${token.constructor.name} in section ${this.name}`)
  }

  private parseToken(token: Token, data: string): Node[] {
    // setup
    this.proceedToNextValue(data)
    const nodes = []
    const endDelimiter = this.getEndDelimiter(token, data)
    let end = data.indexOf(endDelimiter, this.position)
    if (end === -1) {
      this.throwTokenizeEndDelimiterError(token, endDelimiter)
    }
    if (end === this.position) {
      end = end + 1 - Math.min(endDelimiter.length, 1)
    }

    // add new node
    nodes.push(
      new Node(token, data.substring(this.position + token.getStartDelimiter().length, end).trim()))

    // increment cursor
    this.position = end + endDelimiter.length

    // recurse if called for
    if (token.isRepeatable() && this.isNextToken(token, data)) {
      nodes.push(...this.parseToken(token, data))
    }

    return nodes
  }

  private getEndDelimiter(token: Token, data: string) {
    return this.getDelimiter(token.getEndDelimiters(), data)
  }

  private getEndRepeatDelimiter(token: Token, data: string) {
    return this.getDelimiter(token.getEndRepeatDelimiters(), data)
  }

  private getDelimiter(delimiters: string[], data: string) {
    return (delimiters.sort((a, b) => this.compare(data, a, b)))[0]
  }

  private compare(data, a: string, b: string) {
    const posA = data.indexOf(a, this.position)
    const posB = data.indexOf(b, this.position)

    if (posA === -1) {
      return 1
    }
    if (posB === -1) {
      return -1
    }

    return posA - posB
  }

  private isNextToken(token: Token, data: string): boolean {
    if (token instanceof CharacterValue) {
      return data.indexOf(this.getEndRepeatDelimiter(token, data), this.position) - this.position > 0
    }
    return data.indexOf(token.getStartDelimiter(), this.position) === this.position
  }
}

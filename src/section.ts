import v4 = require("uuid/v4")
import Node from "./node"
import SubsectionToken from "./token/subsectionToken"
import Token from "./token/token"

export default class Section {
  private static readonly endCursor = [" ", "\n", "\t"]
  private position: number
  private first = true
  private data: string

  constructor(
    public readonly name: string,
    public readonly header: Token,
    public readonly tokens: Token[],
    public readonly subsectionTokens: SubsectionToken[],
    public readonly isRepeatable: boolean,
    public readonly endRepeatDelimiter: string) {}

  public getNodes(data: string, position: number): Node[] {
    this.data = data
    this.position = position
    const nodes = []
    if (this.first) {
      nodes.push(...this.parseToken(this.header))
      this.first = false
    }
    if (this.isAtSectionEndRepeatDelimiter()) {
      return nodes
    }
    this.tokens.forEach(token => nodes.push(...this.parseToken(token)))
    let proceeding = true
    while (proceeding) {
      const pos = this.position
      this.subsectionTokens.forEach(token => nodes.push(...this.parseSubsection(token)))
      if (pos === this.position) {
        proceeding = false
      }
    }
    return nodes
  }

  public getPosition(): number {
    return this.position
  }

  private isAtSectionEndRepeatDelimiter(): boolean {
    return this.isRepeatable &&
      this.data.substring(this.position, this.position + this.endRepeatDelimiter.length) === this.endRepeatDelimiter
  }

  private proceedToNextNonWhitespaceValue() {
    while (Section.endCursor.indexOf(this.data[this.position]) > -1) {
      this.position++
    }
  }

  private throwTokenizeEndDelimiterError(token: Token, endDelimiter: string) {
    throw new Error(`missing end "${endDelimiter}", ${token.constructor.name} in section ${this.name}`)
  }

  private parseToken(token: Token): Node[] {
    // setup
    this.proceedToNextNonWhitespaceValue()
    const nodes = []
    const endDelimiter = this.getEndDelimiter(token)
    const end = this.calculateEndDelimiterPosition(token, endDelimiter)

    // add new node
    const node = new Node(token, this.data.substring(this.position + token.getStartDelimiter().length, end).trim())
    if (token.getEndRepeatDelimiters().indexOf(node.parsedValue) > -1) {
      return nodes
    }
    nodes.push(node)

    // increment cursor
    this.position = end + endDelimiter.length

    // recurse if called for
    if (token.isRepeatable() && this.isStillTokenizing(token)) {
      nodes.push(...this.parseToken(token))
    }

    return nodes
  }

  private parseSubsection(token): Node[] {
    const nodes = []
    while (this.shouldContinueSubsectionTokenization(token)) {
      const id = v4()
      token.tokens.forEach(subsectionToken => {
        const parsedNodes = this.parseToken(subsectionToken)
        parsedNodes.forEach(parsedNode => {
          parsedNode.setElementId(id)
          parsedNode.setSubsectionToken(token)
        })
        nodes.push(...parsedNodes)
      })
    }

    return nodes
  }

  private calculateEndDelimiterPosition(token: Token, endDelimiter: string): number {
    const end = this.data.indexOf(endDelimiter, this.position)
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

    if (posA > posB) {
      return 1
    }
    if (posA < posB) {
      return -1
    }
    return 0
  }

  private isStillTokenizing(token: Token): boolean {
    return this.data.indexOf(this.getEndRepeatDelimiter(token), this.position) > this.position
  }

  private shouldContinueSubsectionTokenization(token) {
    const nextPart = this.getNextPart()
    return nextPart.indexOf(token.getStartDelimiter()) === 0 && nextPart !== this.endRepeatDelimiter
  }

  private getNextPart() {
    this.proceedToNextNonWhitespaceValue()
    const end = this.data.indexOf("\n", this.position)
    if (end === -1) {
      return this.data.substring(this.position)
    }
    return this.data.substring(this.position, end)
  }
}

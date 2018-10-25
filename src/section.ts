import Token from "./token/token"
import Node from "./node"
import CharacterValue from "./token/characterValue"
import SubsectionToken from "./token/subsectionToken"

export default class Section {
  private static readonly endCursor = [" ", "\n"]
  private position: number
  private first = true

  constructor(
    public readonly name: string,
    public readonly header: Token,
    public readonly tokens: Token[],
    public readonly isRepeatable: boolean = true) {}

  public getNodes(data: string, position: number): Node[] {
    this.position = position
    const nodes = []
    if (this.first) {
      nodes.push(this.parseToken(this.header, data))
    }
    this.tokens.forEach(token => {
      if (token instanceof SubsectionToken) {
        nodes.push(...this.parseSubsection(token, data))
        return
      }
      const createdNodes = this.parseToken(token, data)
      nodes.push(...createdNodes)
    })
    this.first = false
    return nodes
  }

  public getPosition(): number {
    return this.position
  }

  private parseSubsection(token, data) {
    const nodes = []
    while (this.getNextLine(data).indexOf(token.getStartDelimiter()) === 0) {
      token.tokens.forEach(subsectionToken => {
        nodes.push(...this.parseToken(subsectionToken, data))
      })
    }
    return nodes
  }

  private getNextLine(data: string) {
    return data.substring(this.position, data.indexOf("\n", this.position))
  }

  private parseToken(token: Token, data: string): Node[] {
    const nodes = []
    while (Section.endCursor.indexOf(data[this.position]) > -1) {
      this.position++
    }
    const endDelimiter = this.getEndDelimiter(token, data)
    const startDelimiter = token.getStartDelimiter()
    const endPos = data.indexOf(endDelimiter, this.position)
    const end = endPos === this.position ? endPos + 1 : endPos
    const value = data.substring(
      data.indexOf(startDelimiter, this.position) + startDelimiter.length,
      end).trim()
    nodes.push(new Node(token, value))
    this.position = end + endDelimiter.length
    if (token.isRepeatable() && this.isNextToken(token, data)) {
      nodes.push(...this.parseToken(token, data))
    }

    return nodes
  }

  private getEndDelimiter(token: Token, data: string) {
    const endpos = token
      .getEndDelimiters()
      .sort((a, b) => data.indexOf(a, this.position) - data.indexOf(b, this.position))
    return endpos[0]
  }

  private getEndRepeatDelimiter(token: Token, data: string) {
    const endpos = token
      .getEndRepeatDelimiters()
      .sort((a, b) => data.indexOf(a, this.position) - data.indexOf(b, this.position))
    return endpos[0]
  }

  private isNextToken(token: Token, data: string): boolean {
    if (token instanceof CharacterValue) {
      return data.indexOf(this.getEndRepeatDelimiter(token, data), this.position) - this.position > 0
    }
    return data.indexOf(token.getStartDelimiter(), this.position) === this.position
  }
}

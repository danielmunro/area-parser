import Token from "./token/token"
import Node from "./node"

export default class Section {
  private static isNextToken(token: Token, data: string, position: number): boolean {
    return data.indexOf(token.getStartDelimiter(), position) === 0
  }

  private position: number

  constructor(
    public readonly name: string,
    public readonly tokens: Token[],
    public readonly isRepeatable: boolean = true) {}

  public getNodes(data: string, position: number): Node[] {
    this.position = position
    const nodes = []
    this.tokens.forEach(token => {
      nodes.push(...this.parseToken(token, data))
    })
    return nodes
  }

  public getPosition(): number {
    return this.position
  }

  private parseToken(token: Token, data: string): Node[] {
    const nodes = []
    const endDelimiter = this.getEndDelimiter(token, data)
    const end = data.indexOf(endDelimiter, this.position)
    const value = data.substring(
      data.indexOf(token.getStartDelimiter(), this.position) + token.getStartDelimiter().length, end)
    nodes.push(new Node(token, value))
    this.position = end + endDelimiter.length

    if (token.isRepeatable() && Section.isNextToken(token, data, this.position)) {
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
}

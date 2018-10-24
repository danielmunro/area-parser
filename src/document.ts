import Token from "./token/token"
import Node from "./node"

export default class Document {
  private tokens: Token[] = []
  private position = 0

  constructor(public readonly rawData: string) {}

  public addTokens(tokens: Token[]) {
    this.tokens.push(...tokens)
  }

  public readValues(): Node[] {
    const nodes = []
    this.tokens.forEach(token => {
      nodes.push(...this.parseToken(token))
    })
    return nodes
  }

  private parseToken(token: Token): Node[] {
    const nodes = []
    const end = this.rawData.indexOf(token.getEndDelimiter(), this.position)
    const value = this.rawData.substring(
      this.rawData.indexOf(token.getStartDelimiter(), this.position) + token.getStartDelimiter().length, end)
    nodes.push(new Node(token, value))
    this.position = end + token.getEndDelimiter().length

    if (token.isRepeatable() && this.isNextToken(token)) {
      nodes.push(...this.parseToken(token))
    }

    return nodes
  }

  private isNextToken(token: Token): boolean {
    return this.rawData.indexOf(token.getStartDelimiter(), this.position) === 0
  }
}

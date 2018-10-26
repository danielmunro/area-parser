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
    console.log(`start of getNodes(), position: ${position}`)
    this.position = position
    const nodes = []
    if (this.first) {
      nodes.push(this.parseToken(this.header, data))
    }
    this.tokens.forEach(token => {
      if (token instanceof SubsectionToken) {
        console.log("subsection")
        nodes.push(...this.parseSubsection(token, data))
        return
      }
      console.log("token")
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
    if (this.getNextLine(data) === "S") {
      this.position++
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
    let end = data.indexOf(endDelimiter, this.position)
    if (end === -1) {
      console.error("could not find end delimiter", data.substring(this.position), `"${endDelimiter}"`)
      return []
    }
    if (end === this.position) {
      end = end + 1 - Math.min(endDelimiter.length, 1)
    }
    const newPos = end + endDelimiter.length
    const value = data.substring(
      data.indexOf(startDelimiter, this.position) + startDelimiter.length,
      end).trim()
    nodes.push(new Node(token, value))
    this.position = newPos
    if (token.isRepeatable() && this.isNextToken(token, data)) {
      nodes.push(...this.parseToken(token, data))
    }

    return nodes
  }

  private getEndDelimiter(token: Token, data: string) {
    const endpos = token
      .getEndDelimiters()
      .sort((a, b) => this.compare(data, a, b))
    return endpos[0]
  }

  private getEndRepeatDelimiter(token: Token, data: string) {
    const endpos = token
      .getEndRepeatDelimiters()
      .sort((a, b) => this.compare(data, a, b))
    return endpos[0]
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

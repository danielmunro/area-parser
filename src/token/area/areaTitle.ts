import Token from "../token"

export default class AreaTitle implements Token {
  public getStartDelimiter(): string {
    return "#"
  }

  public getEndDelimiter(): string {
    return "\n"
  }

  public isRepeatable(): boolean {
    return false
  }
}

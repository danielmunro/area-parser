import Token from "./token"

export default class DiscreetValue implements Token {
  public getStartDelimiter(): string {
    return ""
  }

  public getEndDelimiters(): string[] {
    return [" ", "\n\n"]
  }

  public isRepeatable(): boolean {
    return false
  }
}

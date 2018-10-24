import Token from "./token"

export default class NonrepeatableContentToken implements Token {
  public getStartDelimiter(): string {
    return ""
  }

  public getEndDelimiters(): string[] {
    return ["~\n"]
  }

  public isRepeatable(): boolean {
    return false
  }
}

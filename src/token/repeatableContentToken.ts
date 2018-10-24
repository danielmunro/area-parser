import Token from "./token"

export default class RepeatableContentToken implements Token {
  public getStartDelimiter(): string {
    return ""
  }

  public getEndDelimiters(): string[] {
    return ["~\n"]
  }

  public isRepeatable(): boolean {
    return true
  }
}

import Token from "./token"

export default class DiscreetValue implements Token {
  constructor(public readonly identifier: string = null) {}

  public getStartDelimiter(): string {
    return ""
  }

  public getEndDelimiters(): string[] {
    return [" ", "\n\n", "~\n", "\n"]
  }

  public isRepeatable(): boolean {
    return false
  }

  public getEndRepeatDelimiters(): string[] {
    return []
  }
}

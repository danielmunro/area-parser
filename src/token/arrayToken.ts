import Token from "./token"

export default class ArrayToken implements Token {
  constructor(public readonly identifier: string = null) {}

  public getStartDelimiter(): string {
    return ""
  }

  public getEndDelimiters(): string[] {
    return [" ", "\t"]
  }

  public isRepeatable(): boolean {
    return true
  }

  public getEndRepeatDelimiters(): string[] {
    return ["*", "\t"]
  }
}

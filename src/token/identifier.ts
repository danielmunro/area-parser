import Token from "./token"

export default class Identifier implements Token {
  constructor(public readonly identifier: string = "id") {}

  public getStartDelimiter(): string {
    return "#"
  }

  public getEndDelimiters(): string[] {
    return ["\n"]
  }

  public isRepeatable(): boolean {
    return false
  }

  public getEndRepeatDelimiters(): string[] {
    return []
  }
}

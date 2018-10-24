import Token from "./token"

export default class CharacterValue implements Token {
  constructor(public readonly identifier: string = null) {}

  public getStartDelimiter(): string {
    return ""
  }

  public getEndDelimiters(): string[] {
    return ["\n", ""]
  }

  public isRepeatable(): boolean {
    return true
  }

  public getEndRepeatDelimiters(): string[] {
    return [" ", "\n"]
  }
}

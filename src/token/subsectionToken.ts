import Token from "./token"

export default class SubsectionToken implements Token {
  private startDelimiter: string = ""

  constructor(
    public readonly identifier: string,
    public readonly tokens: Token[],
  ) {}

  public getStartDelimiter(): string {
    return this.startDelimiter
  }

  public getEndDelimiters(): string[] {
    return []
  }

  public isRepeatable(): boolean {
    return false
  }

  public getEndRepeatDelimiters(): string[] {
    return ["S"]
  }

  public identifiedBy(startDelimiter: string): SubsectionToken {
    this.startDelimiter = startDelimiter

    return this
  }
}

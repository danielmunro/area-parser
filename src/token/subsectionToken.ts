import Token from "./token"

export default class SubsectionToken implements Token {
  private startDelimiter: string = ""
  private groupTokens: boolean = false

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
    return true
  }

  public getEndRepeatDelimiters(): string[] {
    return ["S"]
  }

  public identifiedBy(startDelimiter: string): SubsectionToken {
    this.startDelimiter = startDelimiter

    return this
  }

  public groupResults(): SubsectionToken {
    this.groupTokens = true

    return this
  }

  public isGrouped(): boolean {
    return this.groupTokens
  }
}

import Token from "./token/token"
import SubsectionToken from "./token/subsectionToken"

export default class Node {
  private subsectionToken: SubsectionToken
  private elementId: string

  constructor(
      public readonly token: Token,
      public parsedValue: string) {}

  public setSubsectionToken(subsectionToken: SubsectionToken) {
    this.subsectionToken = subsectionToken
  }

  public isGrouped(): boolean {
    return this.subsectionToken && this.subsectionToken.isGrouped()
  }

  public getGroup(): string {
    return this.subsectionToken.identifier
  }

  public setElementId(id) {
    this.elementId = id
  }

  public getElementId() {
    return this.elementId
  }
}

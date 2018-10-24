import Token from "./token/token"

export default class Section {
  private tokens: Token[]

  constructor(public readonly isRepeatable: boolean) {}
}

import Token from "./token/token"

export default class Node {
  constructor(public readonly token: Token, public parsedValue: string) {}
}

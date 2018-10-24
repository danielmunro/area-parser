export default interface Token {
  // getType() // enum?
  // getValue(): any
  // getChildren(): Token[]
  getStartDelimiter(): string
  getEndDelimiter(): string
  isRepeatable(): boolean
}

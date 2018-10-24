export default interface Token {
  // getType() // enum?
  // getValue(): any
  // getChildren(): Token[]
  getStartDelimiter(): string
  getEndDelimiters(): string[]
  isRepeatable(): boolean
}

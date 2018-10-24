export default interface Token {
  getStartDelimiter(): string
  getEndDelimiters(): string[]
  isRepeatable(): boolean
  getEndRepeatDelimiters(): string[]
}

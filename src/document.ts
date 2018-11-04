import Node from "./node"
import Section from "./section"

export default class Document {
  private static mapToResult(elements) {
    const result = {}
    elements.forEach(element => result[element.token.identifier] = element.parsedValue)

    return result
  }

  private position: number = 0
  private readonly documentLength: number

  constructor(
    public readonly rawData: string,
    public readonly sections: Section[]) {
    this.documentLength = this.rawData.length
  }

  public readValues() {
    return this.sections.map(this.createElementFromSection.bind(this))
  }

  private createElementFromSection(section: Section) {
    const element = { section, values: [] }
    if (section.isRepeatable) {
      element.values.push(...this.readRepeatableSection(section))
      return element
    }
    element.values.push(this.parseSection(section))
    this.position += section.getPosition()
    element.values = element.values.map(Document.mapToResult)

    return element
  }

  private readRepeatableSection(section: Section) {
    const sections = []
    while (this.position < this.documentLength) {
      try {
        sections.push(this.parseSection(section))
      } catch (error) {
        break
      }
      this.position = section.getPosition()
      if (this.isAtEndRepeatDelimiter(section)) {
        this.position += section.endRepeatDelimiter.length
        break
      }
    }
    return sections.map(Document.mapToResult)
  }

  private isAtEndRepeatDelimiter(section: Section): boolean {
    return this.rawData.substring(
      this.position,
      this.position + section.endRepeatDelimiter.length) === section.endRepeatDelimiter
  }

  private parseSection(section): Node[] {
    return section.getNodes(this.rawData, this.position)
  }
}

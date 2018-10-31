import Node from "./node"
import Section from "./section"

export default class Document {
  private static mapToResult(element) {
    const result = {}
    result[element.token.identifier] = element.parsedValue

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
    const element = []
    if (section.isRepeatable) {
      element.push(...this.readRepeatableSection(section))
      return element.map(Document.mapToResult)
    }
    element.push(...this.parseSection(section))
    this.position += section.getPosition()

    return element.map(Document.mapToResult)
  }

  private readRepeatableSection(section: Section): Node[] {
    const sections = []
    while (this.position < this.documentLength) {
      try {
        sections.push(...this.parseSection(section))
      } catch (error) {
        break
      }
      this.position = section.getPosition() + section.endRepeatDelimiter.length
      if (this.isAtEndRepeatDelimiter(section)) {
        break
      }
    }
    return sections
  }

  private isAtEndRepeatDelimiter(section: Section): boolean {
    return this.rawData.substring(section.getPosition(), this.position) === section.endRepeatDelimiter
  }

  private parseSection(section): Node[] {
    return section.getNodes(this.rawData, this.position)
  }
}

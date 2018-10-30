import Node from "./node"
import Section from "./section"

export default class Document {
  private position: number = 0
  private readonly documentLength: number

  constructor(
    public readonly rawData: string,
    public readonly sections: Section[]) {
    this.documentLength = this.rawData.length
  }

  public readValues() {
    return this.sections.map(section => {
      const element = []
      if (section.isRepeatable) {
        element.push(...this.readRepeatableSection(section))
        return element.map(this.mapToResult)
      }
      element.push(...this.parseSection(section))
      this.position += section.getPosition()

      return element.map(this.mapToResult)
    })
  }

  private mapToResult(element) {
    const result = {}
    result[element.token.identifier] = element.parsedValue

    return result
  }

  private readRepeatableSection(section: Section): Node[] {
    const sections = []
    while (this.position < this.documentLength) {
      try {
        sections.push(...this.parseSection(section))
      } catch (error) {
        return sections
      }
      this.position = section.getPosition() + section.endRepeatDelimiter.length
      if (this.rawData.substring(section.getPosition(), this.position) === section.endRepeatDelimiter) {
        break
      }
    }
    return sections
  }

  private parseSection(section): Node[] {
    return section.getNodes(this.rawData, this.position)
  }
}

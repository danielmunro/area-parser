import Element from "./element"
import Node from "./node"
import Section from "./section"

export default class Document {
  private static mapToResult(elements) {
    const result = {}
    elements.forEach(element => {
      const i = element.token.identifier
      if (result[i]) {
        if (typeof result[i] === "string") {
          result[i] = [result[i]]
        }
        result[i].push(element.parsedValue)
        return
      }
      result[i] = element.parsedValue
    })

    return result
  }

  private position: number = 0
  private readonly documentLength: number

  constructor(
    public readonly rawData: string,
    public readonly sections: Section[]) {
    this.documentLength = this.rawData.length
  }

  public readValues(): Element[] {
    return this.sections.map(this.createElementFromSection.bind(this))
  }

  private createElementFromSection(section: Section) {
    const values = []
    if (section.isRepeatable) {
      values.push(...this.readRepeatableSection(section))
      return new Element(section, values)
    }
    values.push(this.parseSection(section))
    this.position += section.getPosition()

    return new Element(section, values.map(Document.mapToResult))
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

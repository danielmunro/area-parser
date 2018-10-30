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

  public readValues(): Node[] {
    const nodes = []
    this.sections.forEach(section => {
      if (section.isRepeatable) {
        nodes.push(...this.readRepeatableSection(section))
        return
      }
      nodes.push(this.parseSection(section))
      this.position += section.getPosition()
    })
    return nodes
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

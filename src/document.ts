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
    const sections = []
    this.sections.forEach(section => {
      if (section.isRepeatable) {
        sections.push(...this.repeatableSection(section))
        return
      }
      sections.push(this.parseSection(section))
      this.position += section.getPosition()
    })
    return sections
  }

  private repeatableSection(section: Section): Node[] {
    const sections = []
    while (this.position < this.documentLength) {
      if (this.rawData.substring(this.position, this.position + 2) === "#0") {
        return sections
      }
      try {
        sections.push(...this.parseSection(section))
      } catch (error) {
        return sections
      }
      this.position = section.getPosition()
    }
    return sections
  }

  private parseSection(section): Node[] {
    return section.getNodes(this.rawData, this.position)
  }
}

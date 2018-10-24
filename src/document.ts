import Node from "./node"
import Section from "./section"

export default class Document {
  private position = 0

  constructor(public readonly rawData: string, public readonly sections: Section[]) {}

  public readValues(): Node[] {
    const sections = []
    this.sections.forEach(section => {
      let line = this.rawData.substring(this.position, this.rawData.indexOf("\n", this.position))
      let sanity = 0
      while (section.isRepeatable && line !== "" && sanity < 1) {
        const element = this.parseSection(section)
        sections.push(element)
        line = this.rawData.substring(this.position, this.rawData.indexOf("\n", this.position))
        sanity++
      }
    })
    return sections
  }

  private parseSection(section) {
    const nodes = section.getNodes(this.rawData, this.position)
    this.position = section.getPosition()
    return nodes
  }
}

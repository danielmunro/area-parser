import Node from "./node"
import Section from "./section"

export default class Document {
  private position = 0

  constructor(public readonly rawData: string, public readonly sections: Section[]) {}

  public readValues(): Node[] {
    const sections = []
    this.sections.forEach(section => {
      let line = this.getNextLine()
      let sanity = 0
      if (section.isRepeatable) {
        while (section.isRepeatable && sanity < 1000 && line !== "#0") {
          const element = this.parseSection(section)
          sections.push(element)
          line = this.getNextLine()
          sanity++
        }
        this.position += 2
        return
      }
      sections.push(this.parseSection(section))
    })
    return sections
  }

  private getNextLine() {
    return this.rawData.substring(this.position, this.rawData.indexOf("\n", this.position))
  }

  private parseSection(section) {
    const nodes = section.getNodes(this.rawData, this.position)
    this.position = section.getPosition()
    return nodes
  }
}

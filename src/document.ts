import Node from "./node"
import Section from "./section"

export default class Document {
  private position: number = 0
  private documentLength: number

  constructor(public readonly rawData: string, public readonly sections: Section[]) {
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
    let sanity = 0
    const sections = []
    console.log(`section: ${section.name}, document length: ${this.documentLength}`)
    while (section.isRepeatable && this.position < this.documentLength) {
      const element = this.parseSection(section)
      sections.push(...element)
      this.position += section.getPosition()
      sanity++
      console.log(`while loop position: ${this.position} (doc length: ${this.documentLength})`, element, sections)
      return sections
    }
    console.log(`position: ${this.position}`)
    return sections
  }

  private parseSection(section): Node[] {
    return section.getNodes(this.rawData, this.position)
  }
}

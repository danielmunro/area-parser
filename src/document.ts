import Node from "./node"
import Section from "./section"

export default class Document {
  private position = 0

  constructor(public readonly rawData: string, public readonly sections: Section[]) {}

  public readValues(): Node[] {
    const nodes = []
    this.sections.forEach(section => {
      nodes.push(...section.getNodes(this.rawData, this.position))
      this.position = section.getPosition()
    })
    return nodes
  }
}

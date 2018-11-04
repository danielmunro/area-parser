import Section from "./section"

export default class Element {
  constructor(public readonly section: Section, public readonly values: any[] = []) {}
}

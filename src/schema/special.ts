import { SECTION_SPECIALS } from "../constants"
import Section from "../section"
import ArrayToken from "../token/arrayToken"
import DiscreetValue from "../token/discreetValue"
import LineToken from "../token/lineToken"
import SectionHeader from "../token/sectionHeader"

export default function getSpecialSchema() {
  return new Section(SECTION_SPECIALS, new SectionHeader(), [
    new DiscreetValue("command"),
    new DiscreetValue("id"),
    new DiscreetValue("special"),
    new LineToken("comment"),
  ], [], true, "S")
}

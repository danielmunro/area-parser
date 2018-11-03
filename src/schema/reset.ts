import { SECTION_RESETS } from "../constants"
import Section from "../section"
import DiscreetValue from "../token/discreetValue"
import SectionHeader from "../token/sectionHeader"
import ArrayToken from "../token/arrayToken"
import LineToken from "../token/lineToken"

export default function getResetSchema() {
  return new Section(SECTION_RESETS, new SectionHeader(), [
    new DiscreetValue("command"),
    new DiscreetValue("throwaway"),
    new ArrayToken("args"),
    new LineToken("comment"),
  ], [], true, "0")
}

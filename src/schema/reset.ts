import { SECTION_RESETS } from "../constants"
import Section from "../section"
import ArrayToken from "../token/arrayToken"
import DiscreetValue from "../token/discreetValue"
import LineToken from "../token/lineToken"
import SectionHeader from "../token/sectionHeader"

export default function getResetSchema() {
  return new Section(SECTION_RESETS, new SectionHeader(), [
    new DiscreetValue("command"),
    new DiscreetValue("throwaway"),
    new ArrayToken("args"),
    new LineToken("comment"),
  ], [], true, "0")
}

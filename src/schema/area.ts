import Section from "../section"
import { SECTION_AREA } from "../constants"
import SectionHeader from "../token/sectionHeader"
import SingleContentToken from "../token/singleContentToken"
import DiscreetValue from "../token/discreetValue"

export default function getAreaSchema() {
  return new Section(SECTION_AREA, new SectionHeader(), [
    new SingleContentToken("file"),
    new SingleContentToken("name"),
    new SingleContentToken("details"),
    new DiscreetValue("startRoomId"),
    new DiscreetValue("endRoomId"),
  ], [], false, "")
}

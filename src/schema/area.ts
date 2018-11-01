import { SECTION_AREA } from "../constants"
import Section from "../section"
import DiscreetValue from "../token/discreetValue"
import SectionHeader from "../token/sectionHeader"
import SingleContentToken from "../token/singleContentToken"

export default function getAreaSchema() {
  return new Section(SECTION_AREA, new SectionHeader(), [
    new SingleContentToken("file"),
    new SingleContentToken("name"),
    new SingleContentToken("details"),
    new DiscreetValue("startRoomId"),
    new DiscreetValue("endRoomId"),
  ], [], false, "")
}

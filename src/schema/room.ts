import Section from "../section"
import { SECTION_ROOMS } from "../constants"
import SectionHeader from "../token/sectionHeader"
import Identifier from "../token/identifier"
import SingleContentToken from "../token/singleContentToken"
import DiscreetValue from "../token/discreetValue"
import CharacterValue from "../token/characterValue"
import SubsectionToken from "../token/subsectionToken"

export default function getRoomSchema() {
  return new Section(SECTION_ROOMS, new SectionHeader(), [
    new Identifier(),
    new SingleContentToken("title"),
    new SingleContentToken("description"),
    new DiscreetValue("areaNumber"),
    new CharacterValue("roomFlags"),
    new DiscreetValue("sectorType"),
    new SubsectionToken("healing", [
      new DiscreetValue("healingFlag"),
      new DiscreetValue("healingRate"),
    ]).identifiedBy("H"),
    new SubsectionToken("mana", [
      new DiscreetValue("manaFlag"),
      new DiscreetValue("manaRate"),
    ]).identifiedBy("M"),
    new SubsectionToken("other", [
      new DiscreetValue("otherFlag"),
      new SingleContentToken("value"),
    ]).identifiedBy("O"),
    new SubsectionToken("doors", [
      new DiscreetValue("door"),
      new SingleContentToken("type"),
      new SingleContentToken("keyword"),
      new DiscreetValue("locks"),
      new DiscreetValue("key"),
      new DiscreetValue("vnum"),
    ]).identifiedBy("D"),
    new SubsectionToken("extra", [
      new DiscreetValue("extra"),
      new SingleContentToken("title"),
      new SingleContentToken("description"),
    ]).identifiedBy("E"),
    new SubsectionToken("observation", [
      new DiscreetValue("target"),
    ]).identifiedBy("B"),
    new SubsectionToken("clan", [
      new DiscreetValue("clan"),
    ]).identifiedBy("C"),
  ], true, "#0")
}
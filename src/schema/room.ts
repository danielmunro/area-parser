import { SECTION_ROOMS } from "../constants"
import Section from "../section"
import CharacterValue from "../token/characterValue"
import DiscreetValue from "../token/discreetValue"
import Identifier from "../token/identifier"
import SectionHeader from "../token/sectionHeader"
import SingleContentToken from "../token/singleContentToken"
import SubsectionToken from "../token/subsectionToken"

export default function getRoomSchema() {
  return new Section(SECTION_ROOMS, new SectionHeader(), [
    new Identifier(),
    new SingleContentToken("title"),
    new SingleContentToken("description"),
    new DiscreetValue("areaNumber"),
    new CharacterValue("roomFlags"),
    new DiscreetValue("sectorType"),
  ], [
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
    ]).identifiedBy("D").groupResults(),
    new SubsectionToken("extra", [
      new DiscreetValue("extra"),
      new SingleContentToken("extraTitle"),
      new SingleContentToken("extraDescription"),
    ]).identifiedBy("E"),
    new SubsectionToken("observation", [
      new DiscreetValue("target"),
    ]).identifiedBy("B"),
    new SubsectionToken("clan", [
      new SingleContentToken("clan"),
    ]).identifiedBy("C"),
    new SubsectionToken("stop", [
      new DiscreetValue("stop"),
    ]).identifiedBy("S"),
  ], true, "#0")
}

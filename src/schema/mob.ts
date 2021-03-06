import { SECTION_MOBILES } from "../constants"
import Section from "../section"
import CharacterValue from "../token/characterValue"
import DiscreetValue from "../token/discreetValue"
import Identifier from "../token/identifier"
import SectionHeader from "../token/sectionHeader"
import SingleContentToken from "../token/singleContentToken"
import SubsectionToken from "../token/subsectionToken"

export default function getMobSchema() {
  return new Section(SECTION_MOBILES, new SectionHeader(), [
    new Identifier(),
    new SingleContentToken("type"),
    new SingleContentToken("name"),
    new SingleContentToken("brief"),
    new SingleContentToken("description"),
    new SingleContentToken("race"),
    new SingleContentToken("spec1"),
    new SingleContentToken("spec2"),
    new SingleContentToken("spec3"),
    new CharacterValue("affects"),
    new DiscreetValue("pShop"),
    new DiscreetValue("alignment"),
    new DiscreetValue("group"),
    new DiscreetValue("level"),
    new DiscreetValue("hitroll"),
    new DiscreetValue("hit"),
    new DiscreetValue("mana"),
    new DiscreetValue("damage"),
    new DiscreetValue("damageType"),
    new DiscreetValue("acPierce"),
    new DiscreetValue("acBash"),
    new DiscreetValue("acSlash"),
    new DiscreetValue("acExotic"),
    new CharacterValue("off"),
    new CharacterValue("imm"),
    new CharacterValue("resist"),
    new CharacterValue("vulnerable"),
    new DiscreetValue("startDisposition"),
    new DiscreetValue("defaultDisposition"),
    new DiscreetValue("gender"),
    new DiscreetValue("wealth"),
    new CharacterValue("form"),
    new CharacterValue("parts"),
    new DiscreetValue("size"),
    new DiscreetValue("material"),
  ], [
    new SubsectionToken("flags", [
      new DiscreetValue("flagName"),
      new DiscreetValue("flagType"),
      new DiscreetValue("flagValue"),
    ]).identifiedBy("F"),
  ], true, "#0")
}

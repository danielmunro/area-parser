import { SECTION_OBJECTS } from "../constants"
import Section from "../section"
import DiscreetValue from "../token/discreetValue"
import Identifier from "../token/identifier"
import LineToken from "../token/lineToken"
import SectionHeader from "../token/sectionHeader"
import SingleContentToken from "../token/singleContentToken"
import SubsectionToken from "../token/subsectionToken"

export default function getObjectSchema() {
  return new Section(SECTION_OBJECTS, new SectionHeader(), [
    new Identifier(),
    new SingleContentToken("name"),
    new SingleContentToken("brief"),
    new SingleContentToken("description"),
    new SingleContentToken("material"),
    new DiscreetValue("type"),
    new DiscreetValue("extraFlag"),
    new DiscreetValue("wearFlag"),
    new LineToken("pObjFlags"),
    new DiscreetValue("level"),
    new DiscreetValue("weight"),
    new DiscreetValue("cost"),
    new DiscreetValue("condition"),
  ], [
    new SubsectionToken("affects", [
      new DiscreetValue("affectFlag"),
      new DiscreetValue("location"),
      new DiscreetValue("modifier"),
    ]).identifiedBy("A"),
    new SubsectionToken("extra", [
      new DiscreetValue("objectFlag"),
      new SingleContentToken("object"),
      new SingleContentToken("description"),
    ]).identifiedBy("E"),
    new SubsectionToken("extra2", [
      new DiscreetValue("letterFlag"),
      new DiscreetValue("affectFlag"),
      new DiscreetValue("location"),
      new DiscreetValue("modifier"),
      new DiscreetValue("bitVector"),
    ]).identifiedBy("F"),
  ], true, "#0")
}

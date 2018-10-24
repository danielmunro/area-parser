import Document from "../src/document"
import { readFileSync } from "fs"
import Section from "../src/section"
import SectionHeader from "../src/token/sectionHeader"
import SingleContentToken from "../src/token/singleContentToken"
import DiscreetValue from "../src/token/discreetValue"
import Identifier from "../src/token/identifier"
import CharacterValue from "../src/token/characterValue"

const SECTION_1_NAME = "area"
const SECTION_2_NAME = "mobiles"

const document = new Document(
  readFileSync("./areas/midgaard.are").toString(), [
    new Section(SECTION_1_NAME, new SectionHeader(), [
      new SingleContentToken("header"),
      new SingleContentToken("name"),
      new SingleContentToken("details"),
      new DiscreetValue("startRoomId"),
      new DiscreetValue("endRoomId"),
    ]),
    new Section(SECTION_2_NAME, new SectionHeader(), [
      new Identifier(),
      new DiscreetValue("type"),
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
    ], true),
  ])

// console.log("result", JSON.stringify(document.readValues()))
console.log("result", document.readValues())

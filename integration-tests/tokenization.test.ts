import { readFileSync } from "fs"
import Document from "../src/document"
import Section from "../src/section"
import SectionHeader from "../src/token/sectionHeader"
import SingleContentToken from "../src/token/singleContentToken"
import DiscreetValue from "../src/token/discreetValue"
import Identifier from "../src/token/identifier"
import CharacterValue from "../src/token/characterValue"
import LineToken from "../src/token/lineToken"
import SubsectionToken from "../src/token/subsectionToken"

const SECTION_AREA = "area"
const SECTION_MOBILES = "mobiles"
const SECTION_OBJECTS = "objects"
const SECTION_ROOMS = "rooms"

const FIXTURES = "./integration-tests/fixtures"

function fixtureData(file) {
  return readFileSync(FIXTURES + "/" + file).toString()
}

describe("rooms", () => {
  it("should load room one", () => {
    const document = getRoom1Document()
    const nodes = document.readValues()
    expect(JSON.stringify(nodes)).toBe(fixtureData("room-1-output.txt"))
  })

  it("should load room two fixtures", () => {
    const document = getRoom2Document()
    const nodes = document.readValues()
    expect(JSON.stringify(nodes)).toBe(fixtureData("room-2-output.txt"))
  })

  it("should load the third room fixture file", () => {
    const document = getRoom3Document()
    const nodes = document.readValues()
    expect(JSON.stringify(nodes)).toBe(fixtureData("room-3-output.txt"))
  })
})

describe("mob tokenizer", () => {
  it("should tokenize the first fixture file", () => {
    const document = getMob1Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("mob-1-output.txt"))
  })

  it("should tokenize the second fixture file", () => {
    const document = getMob2Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("mob-2-output.txt"))
  })
})

describe("object tokenizer", () => {
  it("should tokenize the first fixture file", () => {
    const document = getObject1Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("object-1-output.txt"))
  })
})

describe("area tokenizer", () => {
  it("should tokenize an area header", () => {
    const document = getArea1Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("area-1-output.txt"))
  })
})

describe("multiple section tokenizer", () => {
  it("should tokenize a small collection of sections", () => {
    const document = getMultiple1Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("multiple-1-output.txt"))
  })

  it("should tokenize another small collection of sections", () => {
    const document = getMultiple2Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("multiple-2-output.txt"))
  })

  it("should tokenize a larger collection of sections", () => {
    const document = getMultiple3Document()
    expect(JSON.stringify(document.readValues())).toBe(fixtureData("multiple-3-output.txt"))
  })
})
//
// describe("whole test file", () => {
//   it("I accidentally the whole file", () => {
//     const document = getDocument()
//     const nodes = document.readValues()
//     // console.log(JSON.stringify(nodes))
//
//     nodes.forEach(node => {
//       const data = JSON.stringify(node)
//       // console.log("data", data)
//       expect(data).not.toContain("~")
//       expect(data).not.toContain("#")
//     })
//   })
// })

function getMultiple1Document() {
  return new Document(fixtureData("multiple-1.txt"), [
    getAreaSchema(),
    getMobSchema()])
}

function getMultiple2Document() {
  return new Document(fixtureData("multiple-2.txt"), [
    getMobSchema(),
    getObjectSchema()])
}

function getMultiple3Document() {
  return new Document(fixtureData("multiple-3.txt"), [
    getAreaSchema(),
    getMobSchema(),
    getObjectSchema()])
}

function getArea1Document() {
  return new Document(fixtureData("area-1.txt"), [
    getAreaSchema()])
}

function getObject1Document() {
  return new Document(fixtureData("object-1.txt"), [
    getObjectSchema()])
}

function getMob1Document() {
  return new Document(fixtureData("mob-1.txt"), [
    getMobSchema()])
}

function getMob2Document() {
  return new Document(fixtureData("mob-2.txt"), [
    getMobSchema()])
}

function getRoom1Document() {
  return new Document(fixtureData("room-1.txt"), [
    getRoomSchema()])
}

function getRoom2Document() {
  return new Document(readFileSync("./integration-tests/fixtures/room-2.txt").toString(), [
    getRoomSchema()])
}

function getRoom3Document() {
  return new Document(readFileSync("./integration-tests/fixtures/room-3.txt").toString(), [
    getRoomSchema()])
}

function getDocument() {
  return new Document(readFileSync("./areas/midgaard.are").toString(), [
    getAreaSchema(),
    getMobSchema(),
    getObjectSchema(),
    getRoomSchema()])
}

function getAreaSchema() {
  return new Section(SECTION_AREA, new SectionHeader(), [
    new SingleContentToken("header"),
    new SingleContentToken("name"),
    new SingleContentToken("details"),
    new DiscreetValue("startRoomId"),
    new DiscreetValue("endRoomId"),
  ], false, "", "")
}

function getObjectSchema() {
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
  ], true, "S\n", "#0")
}

function getMobSchema() {
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
    new SubsectionToken("flags", [
      new DiscreetValue("name"),
      new DiscreetValue("flag"),
      new DiscreetValue("value"),
    ]).identifiedBy("F"),
  ], true, "", "#0")
}

function getRoomSchema() {
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
      new DiscreetValue("value"),
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
  ], true, "S\n", "#0")
}

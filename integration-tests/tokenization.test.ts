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

const SECTION_1_NAME = "area"
const SECTION_2_NAME = "mobiles"
const SECTION_3_NAME = "objects"
const SECTION_4_NAME = "rooms"

describe("rooms", () => {
  it("should load room one", () => {
    const document = getRoom1Document()
    const nodes = document.readValues()
    expect(nodes[0][0].parsedValue).toBe("ROOMS")
    expect(nodes[1].parsedValue).toBe("3359")
    expect(nodes[2].parsedValue).toBe("The Inn")
    expect(nodes[3].parsedValue).toBe(`You are standing upstairs from Andy's Pub at Andy's Inn.  A few chairs
and a couple of end tables give the room a \`homey' atmosphere.  A large
stone fireplace burns brightly against one wall and warms the room.  A
large oak desk is nestled in one corner of the room.  A small man with
wire-framed glasses sits behind the desk working dilligently on his books.
He looks up as you enter the room.  He looks at you quizzically.  He is
probably waiting for you to ask him for a room.`)
    expect(nodes[4].parsedValue).toBe("0")
    expect(nodes[5].parsedValue).toBe("D")
    expect(nodes[6].parsedValue).toBe("S")
    expect(nodes[7].parsedValue).toBe("0")
    expect(nodes[8].parsedValue).toBe("D5")
    expect(nodes[9].parsedValue).toBe("Exit")
    expect(nodes[10].parsedValue).toBe("")
    expect(nodes[11].parsedValue).toBe("16384")
    expect(nodes[12].parsedValue).toBe("-1")
    expect(nodes[13].parsedValue).toBe("3356")
  })

  it("should load room two fixtures", () => {
    const document = getRoom2Document()
    const nodes = document.readValues()
    expect(nodes[0][0].parsedValue).toBe("ROOMS")
    expect(nodes[1].parsedValue).toBe("3357")
    expect(nodes[2].parsedValue).toBe("The Bar")
    expect(nodes[3].parsedValue).toBe(`A long mahogany bar is set in the back of the pub.  Mugs line a shelf
behind the bar.  Bottles of strong, nasty looking liquids decorate one
of the lower shelves.  A large cask rests on a table behind the bar.  A
strong but friendly-looking bartender stands next to the cask polishing
glasses.  A couple of the bar maids stand in a corner and throw the most
inviting glances your way.
A sign is on the wall.`)
    expect(nodes[4].parsedValue).toBe("0")
    expect(nodes[5].parsedValue).toBe("D")
    expect(nodes[6].parsedValue).toBe("S")
    expect(nodes[7].parsedValue).toBe("0")
    expect(nodes[8].parsedValue).toBe("D0")
    expect(nodes[9].parsedValue).toBe("Exit")
    expect(nodes[10].parsedValue).toBe("")
    expect(nodes[11].parsedValue).toBe("16384")
    expect(nodes[12].parsedValue).toBe("-1")
    expect(nodes[13].parsedValue).toBe("3355")
    expect(nodes[14].parsedValue).toBe("E")
    expect(nodes[15].parsedValue).toBe("sign")
    expect(nodes[16].parsedValue).toBe("The sign says: Don't forget our dinner menu.")
    expect(nodes[17].parsedValue).toBe("3358")
    expect(nodes[18].parsedValue).toBe("The Bar")
    expect(nodes[19].parsedValue).toBe(`A long mahogany bar is set in the back of the pub.  Mugs line a shelf
behind the bar.  Bottles of strong, nasty looking liquids decorate one
of the lower shelves.  A large cask rests on a table behind the bar.  A
strong but friendly looking bartender stands next to the cask polishing
glasses.  A couple of the bar maids stand in a corner and throw the most
inviting glances your way.`)
    expect(nodes[20].parsedValue).toBe("0")
    expect(nodes[21].parsedValue).toBe("D")
    expect(nodes[22].parsedValue).toBe("S")
    expect(nodes[23].parsedValue).toBe("0")
    expect(nodes[24].parsedValue).toBe("D0")
    expect(nodes[25].parsedValue).toBe("Exit")
    expect(nodes[26].parsedValue).toBe("")
    expect(nodes[27].parsedValue).toBe("16384")
    expect(nodes[28].parsedValue).toBe("-1")
    expect(nodes[29].parsedValue).toBe("3356")
    expect(nodes[30].parsedValue).toBe("E")
    expect(nodes[31].parsedValue).toBe("sign")
    expect(nodes[32].parsedValue).toBe("The sign says: Don't forget our dinner menu.")
  })
})

// describe("mobiles", () => {
//   it("should be able to tokenize the test file", () => {
//     const document = getDocument()
//     const nodes = document.readValues()
//     // expect(nodes).toHaveLength(1298)
//
//     nodes.forEach(node => {
//       const data = JSON.stringify(node)
//       // console.log("data", data)
//       expect(data).not.toContain("~")
//       expect(data).not.toContain("#")
//     })
//   })
// })

function getRoom2Document() {
  return new Document(readFileSync("./integration-tests/fixtures/room-2.txt").toString(), [
    getRoomDefinition()])
}


function getRoom1Document() {
  return new Document(readFileSync("./integration-tests/fixtures/room-1.txt").toString(), [
    getRoomDefinition()])
}

function getDocument() {
  return new Document(readFileSync("./areas/midgaard.are").toString(), [
  new Section(SECTION_1_NAME, new SectionHeader(), [
    new SingleContentToken("header"),
    new SingleContentToken("name"),
    new SingleContentToken("details"),
    new DiscreetValue("startRoomId"),
    new DiscreetValue("endRoomId"),
  ], false),
    new Section(SECTION_2_NAME, new SectionHeader(), [
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
    ], true),
    new Section(SECTION_3_NAME, new SectionHeader(), [
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
    ], true),
    getRoomDefinition()])
}

function getRoomDefinition() {
  return new Section(SECTION_4_NAME, new SectionHeader(), [
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
  ], true)
}
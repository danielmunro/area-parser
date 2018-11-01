import { readFileSync } from "fs"
import Document from "../src/document"
import getAreaSchema from "../src/schema/area"
import getMobSchema from "../src/schema/mob"
import getObjectSchema from "../src/schema/object"
import getRoomSchema from "../src/schema/room"

const FIXTURES = "./integration-tests/fixtures"

function fixtureData(file) {
  return readFileSync(FIXTURES + "/" + file).toString()
}

describe("rooms", () => {
  it.each([
    1, 2, 3, 4,
  ])("should load room fixture file %s", iteration => {
    expect(JSON.stringify(getRoomDocument(iteration).readValues()))
      .toBe(fixtureData(`room-${iteration}-output.txt`))
  })
})

describe("mob tokenizer", () => {
  it.each([
    1, 2,
  ])("should tokenize mob fixture file %s", iteration => {
    expect(JSON.stringify(getMobDocument(iteration).readValues()))
      .toBe(fixtureData(`mob-${iteration}-output.txt`))
  })
})

describe("object tokenizer", () => {
  it.each([
    1, 2, 3,
  ])("should tokenize object fixture file %s", iteration => {
    expect(JSON.stringify(getObjectDocument(iteration).readValues()))
      .toBe(fixtureData(`object-${iteration}-output.txt`))
  })
})

describe("area tokenizer", () => {
  it("should tokenize an area header", () => {
    expect(JSON.stringify(getArea1Document().readValues()))
      .toBe(fixtureData("area-1-output.txt"))
  })
})

describe("multiple section tokenizer", () => {
  it("should tokenize a small collection of sections", () => {
    expect(JSON.stringify(getMultiple1Document().readValues()))
      .toBe(fixtureData("multiple-1-output.txt"))
  })

  it("should tokenize another small collection of sections", () => {
    expect(JSON.stringify(getMultiple2Document().readValues()))
      .toBe(fixtureData("multiple-2-output.txt"))
  })

  it("should tokenize a larger collection of sections", () => {
    expect(JSON.stringify(getMultiple3Document().readValues()))
      .toBe(fixtureData("multiple-3-output.txt"))
  })
})

function getAreaList(): string[] {
  return readFileSync("./integration-tests/fixtures/areas/area-passing.lst").toString().trim().split("\n")

}

describe("whole test file", () => {
  it.each(getAreaList())("should tokenize %s", file => {
    const document = getSourceDocument(file)
    const nodes = document.readValues()
    expect(nodes.length).toBe(4)

    nodes.forEach(node => {
      const data = JSON.stringify(node)
      expect(data).not.toContain("~")
      expect(data).not.toContain("#")
    })
  })
})

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

function getObjectDocument(documentNumber: number) {
  return new Document(fixtureData(`object-${documentNumber}.txt`), [
    getObjectSchema()])
}

function getMobDocument(documentNumber: number) {
  return new Document(fixtureData(`mob-${documentNumber}.txt`), [
    getMobSchema()])
}

function getRoomDocument(testNumber: number) {
  return new Document(fixtureData(`room-${testNumber}.txt`).toString(), [
    getRoomSchema()])
}

function getSourceDocument(document: string) {
  return new Document(fixtureData(document).toString(), [
    getAreaSchema(),
    getMobSchema(),
    getObjectSchema(),
    getRoomSchema()])
}

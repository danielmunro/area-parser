import Document from "../src/document"
import { readFileSync } from "fs"
import AreaTitle from "../src/token/area/areaTitle"
import AreaFile from "../src/token/area/areaFile"
import AreaDescription from "../src/token/area/areaDescription"
import Section from "../src/section"
import AreaDetails from "../src/token/area/areaDetails"
import AreaRoomIDFloor from "../src/token/area/areaRoomIDFloor"
import AreaRoomIDCeil from "../src/token/area/areaRoomIDCeil"

const SECTION_1_NAME = "area heading"

const document = new Document(
  readFileSync("./areas/midgaard.are").toString(), [
    new Section(SECTION_1_NAME, [
      new AreaTitle(),
      new AreaFile(),
      new AreaDescription(),
      new AreaDetails(),
      new AreaRoomIDFloor(),
      new AreaRoomIDCeil(),
    ]),
  ])

console.log("result", document.readValues())

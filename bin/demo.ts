import Document from "../src/document"
import { readFileSync } from "fs"
import AreaTitle from "../src/token/area/areaTitle"
import AreaFile from "../src/token/area/areaFile"
import AreaDescription from "../src/token/area/areaDescription"

const document = new Document(readFileSync("./areas/midgaard.are").toString())
document.addTokens([
  new AreaTitle(),
  new AreaFile(),
  new AreaDescription(),
])

console.log("result", document.readValues())

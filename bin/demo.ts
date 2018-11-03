import * as fs from "fs"
import Document from "../src/document"
import getPrimarySource from "../src/schema/primarySource"

const baseDir = "integration-tests/fixtures"
const areasFile = process.argv[2]
const out = process.argv[3]

if (!fs.existsSync(areasFile)) {
  console.error("source areas missing or does not exist")
  process.exit()
}

if (!fs.existsSync(out)) {
  console.error("destination directory missing or does not exist")
  process.exit()
}

const areas = fs.readFileSync(areasFile).toString().split("\n")
areas.forEach(area => {
  const document = new Document(
    fs.readFileSync(`${baseDir}/${area}`).toString(),
    [...getPrimarySource()])
  const nodes = document.readValues()
  fs.writeFileSync(
    `${out}/${area}`,
    JSON.stringify(nodes),
  )
})

import { SECTION_SHOPS } from "../constants"
import Section from "../section"
import ArrayToken from "../token/arrayToken"
import DiscreetValue from "../token/discreetValue"
import LineToken from "../token/lineToken"
import SectionHeader from "../token/sectionHeader"

export default function getShopSchema() {
  return new Section(SECTION_SHOPS, new SectionHeader(), [
    new DiscreetValue("keeper"),
    new ArrayToken("buyType"),
    new DiscreetValue("profitBuy"),
    new DiscreetValue("profitSell"),
    new DiscreetValue("openHour"),
    new DiscreetValue("closeHour"),
    new LineToken("comment"),
  ], [], true, "0")
}

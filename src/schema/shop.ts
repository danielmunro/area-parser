import { SECTION_SHOPS } from "../constants"
import Section from "../section"
import DiscreetValue from "../token/discreetValue"
import SectionHeader from "../token/sectionHeader"
import LineToken from "../token/lineToken"
import ArrayToken from "../token/arrayToken"

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

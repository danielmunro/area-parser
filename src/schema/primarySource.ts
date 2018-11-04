import getAreaSchema from "./area"
import getMobSchema from "./mob"
import getObjectSchema from "./object"
import getResetSchema from "./reset"
import getRoomSchema from "./room"
// import getSpecialSchema from "./special"

export default function getPrimarySource() {
  return [
    getAreaSchema(),
    getMobSchema(),
    getObjectSchema(),
    getRoomSchema(),
    // getResetSchema(),
    // getSpecialSchema(),
  ]
}

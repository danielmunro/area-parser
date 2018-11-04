import getAreaSchema from "./area"
import getMobSchema from "./mob"
import getObjectSchema from "./object"
import getRoomSchema from "./room"
import getResetSchema from "./reset"

export default function getPrimarySource() {
  return [
    getAreaSchema(),
    getMobSchema(),
    getObjectSchema(),
    getRoomSchema(),
    getResetSchema(),
  ]
}
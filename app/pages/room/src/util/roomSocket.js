import { constants } from "../../../_shared/constants.js";
import SocketBuilder from "../../../_shared/socket.js";

export default class RoomSocketBuilder extends SocketBuilder {
    constructor({socketURL, nameSpace}) {
        super({socketURL, nameSpace})
        this.roomUpdated = () => { }
    }

    setRoomUpdated(fn) {
        this.roomUpdated = fn

        return this
    }

    build() {
        const socket = super.build()

        socket.on(constants.events.LOBBY_UPDATED, this.roomUpdated)

        return socket
    }
}
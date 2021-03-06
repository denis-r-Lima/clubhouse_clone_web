import { constants } from './constants.js'

export default class SocketBuilder {
  constructor({ socketURL, nameSpace }) {
    this.socketURL = `${socketURL}/${nameSpace}`
    this.onUserConnected = () => {}
    this.onUserDisconnected = () => {}
  }

  setOnUserConnected(fn) {
    this.onUserConnected = fn

    return this
  }

  setOnUserDisconnected(fn) {
    this.onUserDisconnected = fn

    return this
  }

  build() {
    const socket = globalThis.io.connect(this.socketURL, {
      withCredentials: false
    })
    socket.on('connect', () => console.log('conectei'))
    socket.on(constants.events.USER_CONNECTED, this.onUserConnected)
    socket.on(constants.events.USER_DISCONNECT, this.onUserDisconnected)

    return socket
  }
}

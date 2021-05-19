import { constants } from '../../_shared/constants.js'
import RoomSocketBuilder from './util/roomSocket.js'


const socketBuilder = new RoomSocketBuilder({
  socketURL: constants.socketURL,
  nameSpace: constants.socketNamespaces.room
})

const socket = socketBuilder
  .setOnUserConnected(user => console.log(user))
  .setOnUserDisconnected(user => console.log(user))
  .setRoomUpdated(room => console.log('Room list ', room))
  .build()

const room = {
  id: '001',
  topic: 'Js Expert'
}

const user = {
  img:
    'https://cdn4.iconfinder.com/data/icons/smileys-for-fun/128/smiley__9-256.png',
  userName: 'Denis Lima ' + Date.now()
}

socket.emit(constants.events.JOIN_ROOM, { user, room })

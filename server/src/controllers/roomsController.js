import Attendee from '../entities/attendee.js'
import Room from '../entities/room.js'
import { constants } from '../util/constants.js'

export default class RoomsController {
  #users = new Map()
  constructor() {
    this.rooms = new Map()
  }

  joinRoom(socket, { user, room }) {
    const userID = (user.id = socket.id)
    const roomID = room.id

    const updatesUserData = this.#updateGlobalUserData(userID, user, roomID)

    const updatedRoom = this.#joinUserRoom(socket, updatesUserData, room)

    console.log(updatedRoom)

    this.#notifyUsersOnRoom(socket, roomID, updatesUserData)
    this.#ReplyWithActiveUsers(socket, updatedRoom.users)
  }

  onNewConnection(socket) {
    const { id } = socket
    console.log('Connection established with', id)
    this.#updateGlobalUserData(id)
  }

  #ReplyWithActiveUsers(socket, users) {
      const event = constants.event.LOBBY_UPDATED

      socket.emit(event, [...users.values()])
  }

  #updateGlobalUserData(userID, userData = {}, roomID = '') {
    const user = this.#users.get(userID) ?? {}
    const existingRoom = this.rooms.has(roomID)

    const updatedUserData = new Attendee({
      ...user,
      ...userData,
      roomID,
      isSpeaker: !existingRoom
    })

    this.#users.set(userID, updatedUserData)
    return this.#users.get(userID)
  }

  #joinUserRoom(socket, user, room) {
    const roomID = room.id
    const existingRoom = this.rooms.has(roomID)
    const currentRoom = existingRoom ? this.rooms.get(roomID) : {}
    const currentUser = new Attendee({
      ...user,
      roomID
    })

    const [owner, users] = existingRoom
      ? [currentRoom.owner, currentRoom.users]
      : [currentUser, new Set()]

      const updatedRoom = this.#mapRoom({
          ...currentRoom,
          ...room,
          owner,
          users: new Set([...users, ...[currentUser]])
      })

      this.rooms.set(roomID, updatedRoom)

      socket.join(roomID)

      return this.rooms.get(roomID)
  }

  #mapRoom(room) {
    const users = [...room.users.values()]
    const speakersCount = users.filter(user => user.isSpeaker).length
    const featuredAttendees = users.slice(0, 3)
    const mappedRoom = new Room({
        ...room,
        featuredAttendees,
        speakersCount,
        attendeesCount: room.users.size
    })

    return mappedRoom
  }

  #notifyUsersOnRoom(socket, roomID, user) {
    const event = constants.event.USER_CONNECTED

    socket.to(roomID).emit(event, user)
  }

  getEvents() {
    const functions = Reflect.ownKeys(RoomsController.prototype)
      .filter(fn => fn !== 'constructor')
      .map(name => [name, this[name].bind(this)])

    return new Map(functions)
  }
}

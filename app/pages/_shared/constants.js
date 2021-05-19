export const constants = {
    socketURL: 'http://localhost:3000',
    socketNamespaces: {
        room: 'room',
        lobby: 'lobby'
    },
    events: {
        USER_CONNECTED: 'userConnection',
        USER_DISCONNECT: 'userDisconnection',
        JOIN_ROOM: 'joinRoom',
        LOBBY_UPDATED: 'lobbyUpdated'

    }
}
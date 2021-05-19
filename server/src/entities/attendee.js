export default class Attendee {
    constructor({ id, userName, img, isSpeaker, roomID, peerID }) {
        this.id = id
        this.userName = userName
        this.img = img
        this.isSpeaker = isSpeaker
        this.roomID = roomID
        this.peerID = peerID
    }
    
}
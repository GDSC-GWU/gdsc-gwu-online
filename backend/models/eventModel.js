class Event{
    constructor(name, fromDateTime, toDateTime, url, location, photoURL, id = null){
        (this.name = name),
        (this.fromDateTime = fromDateTime),
        (this.toDateTime = toDateTime),
        (this.url = url),
        (this.location = location),
        (this.photoURL = photoURL),
        (this.id = id)
    }
}

export default Event;
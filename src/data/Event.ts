export interface Event {
    id: Number,
    name: String,
    records: Array<EventRecord>
}

export interface EventRecord {
    timestamp: Number,
    id: Number
}
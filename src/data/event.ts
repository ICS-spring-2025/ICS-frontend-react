export interface InstantEvent {
    id: Number,
    name: String,
    records: Array<InstantRecord>
}

export interface InstantRecord {
    timestamp: Number,
    data: Number
}

export interface RangedEvent {
    id: Number,
    name: String,
    records: Array<RangedRecord>
}

export interface RangedRecord {
    timestamp: Number,
    data: Number,
    end_event_id: Number,
    end_event_name: String,
    end_timestamp: Number,
    end_data: Number
}

export interface EventsDTO {
    instant: Array<InstantEvent>,
    ranged: Array<RangedEvent>
}
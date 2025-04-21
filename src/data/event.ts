export interface InstantEvent {
    id: number,
    name: string,
    records: Array<InstantRecord>
}

export interface InstantRecord {
    timestamp: number,
    data: number
}

export interface RangedEvent {
    id: number,
    name: string,
    records: Array<RangedRecord>
}

export interface RangedRecord {
    timestamp: number,
    data: number,
    end_event_id: number,
    end_event_name: string,
    end_timestamp: number,
    end_data: number
}

export interface EventsDTO {
    instant: Array<InstantEvent>,
    ranged: Array<RangedEvent>
}
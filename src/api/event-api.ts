import {EventsDTO, InstantEvent, InstantRecord, RangedEvent, RangedRecord} from "../data/event";
import axios from "axios";

const BASE_URL = 'http://localhost:5000/app/events';

export interface ResponseEvent {
    id: number,
    name: string,
    records: Array<any>
}

export interface ResponseDTO {
    instant: Array<ResponseEvent>
    ranged: Array<ResponseEvent>
}

export const fetchAllEvents = async (): Promise<EventsDTO> => {
    try {
        const response = await axios.get<EventsDTO>(BASE_URL);
        return mapEvents(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const fetchEventsInRange = async (startTime: number, endTime: number): Promise<EventsDTO> => {
    const RANGE_EVENTS_URL = `${BASE_URL}/${startTime}/${endTime}`;
    try {
        const response = await axios.get<EventsDTO>(RANGE_EVENTS_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching events in range:', error);
        throw error;
    }
};

export const fetchEventsByIdInRange = async (eventID: number, startTime: number, endTime: number): Promise<EventsDTO> => {
    const RANGE_EVENTS_BY_ID_URL = `${BASE_URL}/${eventID}/${startTime}/${endTime}`;
    try {
        const response = await axios.get<EventsDTO>(RANGE_EVENTS_BY_ID_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching events by ID in range:', error);
        throw error;
    }
};

function mapEvents(events: ResponseDTO): EventsDTO {
    const mappedInstant: Array<InstantEvent> = events.instant.map((event) => {
        const mappedRecords: Array<InstantRecord> = event.records.map((record) => ({timestamp: record[0], data: record[1]}));

        return {
            id: event.id,
            name: event.name,
            records: mappedRecords
        }
    });
    const mappedRanged: Array<RangedEvent> = events.ranged.map((event) => {
        const mappedRecords: Array<RangedRecord> = event.records.map((record) => (
            {
                timestamp: record[0],
                data: record[1],
                end_event_id: record[2],
                end_event_name: record[3],
                end_timestamp: record[4],
                end_data: record[5],
                related_events: record[6]
            }
            ));

        return {
            id: event.id,
            name: event.name,
            records: mappedRecords
        }
    });

    return {
        instant: mappedInstant,
        ranged: mappedRanged
    };
}
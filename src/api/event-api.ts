import {EventsDTO} from "../data/event";
import axios from "axios";

const BASE_URL = 'http://localhost:5000/app/events';

export const fetchAllEvents = async (): Promise<EventsDTO> => {
    try {
        const response = await axios.get<EventsDTO>(BASE_URL);
        return response.data;
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
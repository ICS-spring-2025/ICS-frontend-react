import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from './api/event-api';
import InstantEventChart from './components/InstantEventChart';
import RangedEventChart from './components/RangedEventChart';
import { EventsDTO, InstantEvent, RangedEvent } from './data/event';
import './App.css';

const App: React.FC = () => {
    const [events, setEvents] = useState<EventsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const fetchedEvents = await fetchAllEvents();

                setEvents(fetchedEvents);
            } catch (err) {
                setError('Error fetching events');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="header">Logical Analyzer</h1>
            {events?.instant.map((event: InstantEvent) => (
                <div className="event" key={event.id}>
                    <h2>{event.name}</h2>
                    <div className="chart-container">
                        <InstantEventChart event={event} />
                    </div>
                </div>
            ))}
            {events?.ranged.map((event: RangedEvent) => (
                <div className="event" key={event.id}>
                    <h2>{event.name}</h2>
                    <div className="chart-container">
                        <RangedEventChart event={event} />
                    </div>
                </div>
            ))}
            <div className="footer">
                &copy; {new Date().getFullYear()} Logical Analyzer. All rights reserved.
            </div>
        </div>
    );
};

export default App;

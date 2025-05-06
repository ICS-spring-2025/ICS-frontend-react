import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from './api/event-api';
import InstantEventChart from './components/InstantEventChart';
import RangedEventChart from './components/RangedEventChart';
import Filter from './components/Filter';
import { EventsDTO, InstantEvent, RangedEvent } from './data/event';
import './App.css';

const App: React.FC = () => {
    const [events, setEvents] = useState<EventsDTO | null>(null);
    const [filteredEvents, setFilteredEvents] = useState<EventsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedEvents = await fetchAllEvents();
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);
        } catch (err) {
            setError('Error fetching events');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleApplyFilter = (filter: { dataValue: string; startTimestamp: string; endTimestamp: string }) => {
        if (!events) return;

        const { dataValue, startTimestamp, endTimestamp } = filter;

        const filteredInstant = events.instant.map(event => ({
            ...event,
            records: event.records.filter(record => {
                const matchesData = dataValue ? String(record.data).includes(dataValue) : true;
                const matchesStart = startTimestamp ? record.timestamp >= Number(startTimestamp) : true;
                const matchesEnd = endTimestamp ? record.timestamp <= Number(endTimestamp) : true;
                return matchesData && matchesStart && matchesEnd;
            })
        })).filter(event => event.records.length > 0);

        const filteredRanged = events.ranged.map(event => ({
            ...event,
            records: event.records.filter(record => {
                const matchesData = dataValue ? String(record.data).includes(dataValue) : true;
                const matchesStart = startTimestamp ? record.timestamp >= Number(startTimestamp) : true;
                const matchesEnd = endTimestamp ? record.timestamp <= Number(endTimestamp) : true;
                return matchesData && matchesStart && matchesEnd;
            })
        })).filter(event => event.records.length > 0);

        setFilteredEvents({
            instant: filteredInstant,
            ranged: filteredRanged
        });
    };

    const handleResetFilter = () => {
        loadEvents();
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="header">Logical Analyzer</h1>

            <Filter onApply={handleApplyFilter} onReset={handleResetFilter} />

            {filteredEvents?.instant.map((event: InstantEvent) => (
                <div className="event" key={event.id}>
                    <h2>{event.name}</h2>
                    <div className="chart-container">
                        <InstantEventChart event={event} />
                    </div>
                </div>
            ))}
            {filteredEvents?.ranged.map((event: RangedEvent) => (
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

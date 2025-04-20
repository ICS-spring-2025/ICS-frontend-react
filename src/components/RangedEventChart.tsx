import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label} from 'recharts';
import {RangedEvent} from "../data/event";

const RangedEventChart: React.FC<{ event: RangedEvent }> = ({ event }) => {
    const data = event.records.flatMap(record => [
        { timestamp: record.timestamp, data: record.data, name: event.name },
        { timestamp: record.end_timestamp, data: record.end_data, name: record.end_event_name }
    ]);

    return (
        <div>
            <h2>{event.name}</h2>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="timestamp">
                    <Label value="Timestamp" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                    <Label value="Data" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip formatter={(value: any, name: any) => [`${value}`, `${name}`]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="data" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};

export default RangedEventChart;
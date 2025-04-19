import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {RangedEvent} from "../data/Event";

const RangedEventChart: React.FC<{ event: RangedEvent }> = ({ event }) => {
    const data = event.records.flatMap(record => [
        { timestamp: record.timestamp, data: record.data },
        { timestamp: record.end_timestamp, data: record.end_data }
    ]);

    return (
        <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="data" stroke="#82ca9d" />
        </LineChart>
    );
};

export default RangedEventChart;

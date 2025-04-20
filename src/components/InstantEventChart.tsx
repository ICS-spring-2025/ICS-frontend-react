import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {InstantEvent} from "../data/event";

const InstantEventChart: React.FC<{ event: InstantEvent }> = ({ event }) => {
    return (
        <LineChart width={600} height={300} data={event.records}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="data" stroke="#8884d8" />
        </LineChart>
    );
};

export default InstantEventChart;

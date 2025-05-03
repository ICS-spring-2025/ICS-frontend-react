import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import {InstantEvent} from "../data/event";

const InstantEventChart: React.FC<{ event: InstantEvent }> = ({ event }) => {
    return (
            <ResponsiveContainer width={600} height={400}>
                <BarChart data={event.records}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="data" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

    );
};

export default InstantEventChart;

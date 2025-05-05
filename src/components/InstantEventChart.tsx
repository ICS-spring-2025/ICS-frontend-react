import React from 'react';
import {
    XAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ScatterChart,
    Scatter
} from 'recharts';
import { InstantEvent } from "../data/event";

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { timestamp, data } = payload[0].payload;
        return (
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#333'
            }}>
                <div><strong>Timestamp:</strong> {timestamp}</div>
                <div><strong>Data:</strong> {data}</div>
            </div>
        );
    }
    return null;
};

const InstantEventChart: React.FC<{ event: InstantEvent }> = ({ event }) => {
    const dataWithY = event.records.map(record => ({
        timestamp: record.timestamp,
        data: record.data,
        y: 0,
    }));

    return (
        <ResponsiveContainer width={600} height={100}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                <XAxis
                    dataKey="timestamp"
                    type="number"
                    scale="log"
                    domain={['auto', 'auto']}
                    tickCount={10}
                    axisLine={true}
                    tickLine={true}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter
                    data={dataWithY}
                    fill="#8884d8"
                    line={false}
                    shape="circle"
                    isAnimationActive={false}
                    dataKey="timestamp"
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default InstantEventChart;

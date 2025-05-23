import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
    ReferenceLine
} from 'recharts';
import { InstantEvent } from "../data/event";

interface InstantEventChartProps {
    event: InstantEvent;
    maxTimestamp: number;
    minTimestamp: number;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { timestamp, data } = payload[0].payload;
        return (
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid #ccc',
                padding: 10,
                borderRadius: '5px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px'
            }}>
                <div><strong>Timestamp:</strong> {timestamp} ns</div>
                <div><strong>Data:</strong> {data}</div>
            </div>
        );
    }
    return null;
};

const getColor = (data: number) => {
    const r = (data * 1000 - 741) % 256;
    const g = (data * 541 - 54) % 256;
    const b = (data * 317 - 43) % 256;

    return `rgb(${r}, ${g}, ${b})`;
};

const ColoredDot = (props: any) => {
    const {cx, cy, payload} = props;
    if (cx === undefined || cy === undefined) return null;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={5}
            fill={payload.fill}
            stroke="none"
        />
    );
};

const InstantEventChart: React.FC<InstantEventChartProps> = ({ event, maxTimestamp, minTimestamp }) => {
    const dataWithY = event.records.map(record => ({
        timestamp: record.timestamp - minTimestamp,
        data: record.data,
        y: 0,
        fill: getColor(record.data)
    }));

    const tickCount = 10;
    const step = Math.floor(maxTimestamp / (tickCount - 1)) || 1;

    const ticks: number[] = [];
    for (let val = 0; val <= maxTimestamp; val += step) {
        ticks.push(val);
    }
    if (ticks[ticks.length - 1] < maxTimestamp) {
        ticks.push(maxTimestamp);
    }

    return (
        <ResponsiveContainer width={600} height={100}>
            <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={dataWithY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                <XAxis
                    dataKey="timestamp"
                    type="number"
                    domain={[0, maxTimestamp]}
                    ticks={ticks}
                    axisLine={true}
                    tickLine={true}
                    unit="ns"
                />
                <YAxis hide domain={[0, 0]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="y"
                    stroke="none"
                    dot={<ColoredDot />}
                    isAnimationActive={false}
                />
                {ticks.map((tickValue, idx) => (
                    <ReferenceLine
                        key={`ref-line-${idx}`}
                        x={tickValue}
                        strokeWidth={2}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default InstantEventChart;

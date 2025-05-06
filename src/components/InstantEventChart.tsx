import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line
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
                <div><strong>Timestamp:</strong> {timestamp} ms</div>
                <div><strong>Data:</strong> {data}</div>
            </div>
        );
    }
    return null;
};

const hsvToRgb = (h: number, s: number, v: number) => {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;

    if (mod === 0) [r, g, b] = [v, t, p];
    else if (mod === 1) [r, g, b] = [q, v, p];
    else if (mod === 2) [r, g, b] = [p, v, t];
    else if (mod === 3) [r, g, b] = [p, q, v];
    else if (mod === 4) [r, g, b] = [t, p, v];
    else [r, g, b] = [v, p, q];

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
};

const getColor = (data: string) => {
    const hash = Array.from(data).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = (hash % 360) / 360;
    const saturation = 0.7;
    const value = 0.9;
    return hsvToRgb(hue, saturation, value);
};

// Кастомный компонент для точек с цветом из данных
const ColoredDot = (props: any) => {
    const { cx, cy, payload } = props;
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

const InstantEventChart: React.FC<{ event: InstantEvent }> = ({ event }) => {
    const dataWithY = event.records.map(record => ({
        timestamp: record.timestamp,
        data: record.data,
        y: 0,
        fill: getColor(String(record.data))
    }));

    return (
        <ResponsiveContainer width={600} height={100}>
            <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={dataWithY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                <XAxis
                    dataKey="timestamp"
                    type="number"
                    domain={['auto', 'auto']}
                    tickCount={10}
                    axisLine={true}
                    tickLine={true}
                    unit="ms"
                />
                <YAxis hide domain={[0, 0]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="y"
                    stroke="none" // линия не рисуется
                    dot={<ColoredDot />} // кастомные точки с цветом
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default InstantEventChart;

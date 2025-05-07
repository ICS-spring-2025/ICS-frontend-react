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

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { timestamp, data } = payload[0].payload;
        return (
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Прозрачный белый фон
                border: '1px solid #ccc',
                padding: 10,
                borderRadius: '5px', // Закругленные углы
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', // Тень для эффекта глубины
                fontFamily: 'Arial, sans-serif', // Шрифт
                fontSize: '14px' // Размер шрифта
            }}>
                <div><strong>Timestamp:</strong> {timestamp} ms</div>
                <div><strong>Data:</strong> {data}</div>
            </div>
        );
    }
    return null;
};

const getColor = (data: number) => {
    // const hash = data * 100;
    // const hue = (data % hash) / 360;
    // const saturation = 0.7;
    // const value = 0.9;
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

const InstantEventChart: React.FC<{ event: InstantEvent }> = ({ event }) => {
    const dataWithY = event.records.map(record => ({
        timestamp: record.timestamp,
        data: record.data,
        y: 0,
        fill: getColor(record.data)
    }));

    const timestamps = dataWithY.map(d => d.timestamp);
    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    const tickCount = 10;
    const rawStep = (maxTimestamp - minTimestamp) / (tickCount - 1);
    const step = Math.floor(rawStep) || 1;

    const ticks: number[] = [];
    for (let val = minTimestamp; val <= maxTimestamp; val += step) {
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
                    domain={[minTimestamp, maxTimestamp]}
                    ticks={ticks}
                    axisLine={true}
                    tickLine={true}
                    unit="ms"
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

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { RangedEvent } from "../data/event";

interface DataPoint {
    timestamp: number;
    value: 0 | 1;
    data?: any;
    isServicePoint?: boolean;
}

const RangedEventStepChart: React.FC<{ event: RangedEvent }> = ({ event }) => {
    if (!event.records || event.records.length === 0) {
        return <div>No records to display</div>;
    }

    const timePointsSet = new Set<number>();
    event.records.forEach(record => {
        timePointsSet.add(record.timestamp);
        timePointsSet.add(record.end_timestamp);
    });

    let timePoints = Array.from(timePointsSet).sort((a, b) => a - b);

    const minTimestamp = timePoints[0];
    const maxTimestamp = timePoints[timePoints.length - 1];
    const padding = (maxTimestamp - minTimestamp) * 0.1 || 1;

    const leftPoint = minTimestamp - padding > 0 ? minTimestamp - padding : 0;
    const rightPoint = maxTimestamp + padding;

    timePoints = [leftPoint, ...timePoints, rightPoint];

    const data: DataPoint[] = timePoints.map(timestamp => {
        const record = event.records.find(record => timestamp >= record.timestamp && timestamp <= record.end_timestamp);
        if (record) {
            return {
                timestamp,
                value: 1,
                data: record.data,
                isServicePoint: false,
            };
        } else {
            return {
                timestamp,
                value: 0,
                isServicePoint: (timestamp === leftPoint || timestamp === rightPoint),
            };
        }
    });

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const point: DataPoint = payload[0].payload;
            return (
                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: 10 }}>
                    <div><strong>Timestamp:</strong> {point.timestamp}</div>
                    <div><strong>Active:</strong> {point.value}</div>
                    {point.value === 1 && point.data !== undefined && (
                        <div><strong>Data:</strong> {JSON.stringify(point.data)}</div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <LineChart width={700} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis
                dataKey="timestamp"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickCount={10}
            >
                <Label value="Timestamp" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis
                type="number"
                domain={[-0.1, 1.1]}
                ticks={[0, 1]}
                allowDecimals={false}
                tickFormatter={(tick) => tick.toString()}
                mirror={false}
                tick={{ dy: -4 }}
            >
                <Label value="Active (0 or 1)" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
                type="step"
                dataKey="value"
                stroke="#8884d8"
                dot={false}
                isAnimationActive={false}
            />
        </LineChart>
    );
};

export default RangedEventStepChart;

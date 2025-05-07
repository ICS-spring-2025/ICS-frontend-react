import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { RangedEvent, RelatedInstantEvent } from "../data/event";

interface DataPoint {
    timestamp: number;
    value: 0 | 1;
    data?: any;
    relatedEvents?: Array<RelatedInstantEvent>
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
                relatedEvents: record.related_events,
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

    // Кастомный тултип с прокруткой
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const point: DataPoint = payload[0].payload;
            return (
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #ccc',
                        padding: 10,
                        borderRadius: '5px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        maxWidth: 350,
                        maxHeight: 250,
                        overflowY: 'auto',
                        pointerEvents: 'auto'
                    }}
                >
                    <div><strong>Timestamp:</strong> {point.timestamp}</div>
                    <div><strong>Active:</strong> {point.value}</div>
                    {point.value === 1 && point.data !== undefined && (
                        <div style={{ wordBreak: 'break-all' }}>
                            <strong>Data:</strong> {JSON.stringify(point.data)}
                        </div>
                    )}
                    {point.relatedEvents && point.relatedEvents.length > 0 && (
                        <div>
                            <strong>Related Events:</strong>
                            <ul
                                style={{
                                    maxHeight: 100,
                                    overflowY: 'auto',
                                    padding: '0 10px',
                                    margin: '5px 0',
                                    listStyle: 'none'
                                }}
                            >
                                {point.relatedEvents.map(event => (
                                    <li key={event.event_id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: 5 }}>
                                        <div><strong>Event ID:</strong> {event.event_id}</div>
                                        <div><strong>Name:</strong> {event.name}</div>
                                        <div style={{ wordBreak: 'break-all' }}><strong>Data:</strong> {event.data}</div>
                                        <div><strong>Timestamp:</strong> {event.timestamp} ms</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                unit={"ms"}
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
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ pointerEvents: 'auto' }}
            />
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

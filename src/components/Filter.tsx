import React, { useState } from 'react';

interface FilterProps {
    onApply: (filter: { dataValue: string; startTimestamp: string; endTimestamp: string }) => void;
    onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({ onApply, onReset }) => {
    const [dataValue, setDataValue] = useState('');
    const [startTimestamp, setStartTimestamp] = useState('');
    const [endTimestamp, setEndTimestamp] = useState('');

    const handleApply = () => {
        onApply({ dataValue, startTimestamp, endTimestamp });
    };

    const handleReset = () => {
        setDataValue('');
        setStartTimestamp('');
        setEndTimestamp('');
        onReset();
    };

    return (
        <div className="filter-container" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
                type="text"
                placeholder="Фильтр по data"
                value={dataValue}
                onChange={e => setDataValue(e.target.value)}
                style={{ padding: '6px 8px', fontSize: 14, minWidth: 150 }}
            />
            <input
                type="number"
                placeholder="startTimestamp (ms)"
                value={startTimestamp}
                onChange={e => setStartTimestamp(e.target.value)}
                style={{ padding: '6px 8px', fontSize: 14, minWidth: 150 }}
            />
            <input
                type="number"
                placeholder="endTimestamp (ms)"
                value={endTimestamp}
                onChange={e => setEndTimestamp(e.target.value)}
                style={{ padding: '6px 8px', fontSize: 14, minWidth: 150 }}
            />
            <button onClick={handleApply} style={{ padding: '6px 12px', fontSize: 14, cursor: 'pointer' }}>
                Применить
            </button>
            <button onClick={handleReset} style={{ padding: '6px 12px', fontSize: 14, cursor: 'pointer' }}>
                Сбросить
            </button>
        </div>
    );
};

export default Filter;

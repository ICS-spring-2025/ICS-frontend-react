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
        <div className="filter-container">
            <input
                type="text"
                placeholder="Фильтр по data"
                value={dataValue}
                onChange={e => setDataValue(e.target.value)}
                className="filter-input"
            />
            <input
                type="number"
                placeholder="startTimestamp (ns)"
                value={startTimestamp}
                onChange={e => setStartTimestamp(e.target.value)}
                step={10000}
                className="filter-input"
            />
            <input
                type="number"
                placeholder="endTimestamp (ns)"
                value={endTimestamp}
                onChange={e => setEndTimestamp(e.target.value)}
                step={10000}
                className="filter-input"
            />
            <button onClick={handleApply} className="filter-button">
                Применить
            </button>
            <button onClick={handleReset} className="filter-button reset">
                Сбросить
            </button>
        </div>
    );
};

export default Filter;

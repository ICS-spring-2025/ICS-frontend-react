import React from 'react';
import {InstantEvent, RangedEvent} from "./data/Event";
import RangedEventChart from "./components/RangedEventChart";
import InstantEventChart from "./components/InstantEventChart";

const App: React.FC = () => {
  const instantEvent: InstantEvent = {
    id: 1,
    name: 'Instant Event',
    records: [
      { timestamp: 1, data: 10 },
      { timestamp: 2, data: 20 },
      { timestamp: 3, data: 15 },
    ],
  };

  const rangedEvent: RangedEvent = {
    id: 2,
    name: 'Ranged Event',
    records: [
      { timestamp: 1, data: 10, end_event_id: 2, end_event_name: 'End Event', end_timestamp: 3, end_data: 15 },
      { timestamp: 4, data: 20, end_event_id: 3, end_event_name: 'End Event 2', end_timestamp: 6, end_data: 25 },
    ],
  };

  return (
      <div>
        <h1>{instantEvent.name}</h1>
        <InstantEventChart event={instantEvent} />
        <h1>{rangedEvent.name}</h1>
        <RangedEventChart event={rangedEvent} />
      </div>
  );
};

export default App;

import React from 'react';
import {InstantEvent, RangedEvent} from "./data/event";
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

    const rangedEvents: Array<RangedEvent> = [
        {
            id: 133,
            name: "Ranged Event A",
            records: [
                {
                    timestamp: 6982300,
                    data: 0,
                    end_event_id: 135,
                    end_event_name: "Ranged Event A Stop",
                    end_timestamp: 1006970700,
                    end_data: 0
                },
                {
                    timestamp: 1000000000,
                    data: 10,
                    end_event_id: 136,
                    end_event_name: "Ranged Event A Stop 2",
                    end_timestamp: 2000000000,
                    end_data: 5
                }
            ]
        },
        {
            id: 134,
            name: "Ranged Event B",
            records: [
                {
                    timestamp: 2000000000,
                    data: 20,
                    end_event_id: 137,
                    end_event_name: "Ranged Event B Stop",
                    end_timestamp: 3000000000,
                    end_data: 15
                }
            ]
        }
    ];

    return (
      <div>
        <h1>{instantEvent.name}</h1>
        <InstantEventChart event={instantEvent} />
        <h1>Ranged events</h1>
          <div>
              {rangedEvents.map(event => (
                  <RangedEventChart event={event}/>
              ))}
          </div>
      </div>
    );
};

export default App;

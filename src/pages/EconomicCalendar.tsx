import React, { useState, useEffect } from 'react';
import finnhubApi from '../services/finnhubApi';

// Define the interface for economic calendar events
interface EconomicCalendarEvent {
  symbol: string;
  date: string;
  importance: string;
  actual: number | null;
  forecast: number | null;
  previous: number | null;
  // ... other properties as needed (check Finnhub API documentation)
}

function EconomicCalendar() {
  const [calendarData, setCalendarData] = useState<EconomicCalendarEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await finnhubApi.getEconomicCalendar('2023-03-01', '2023-03-31', 'US');
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error states in your UI (e.g., display an error message)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Economic Calendar</h2>
      {calendarData.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Importance</th>
              <th>Actual</th>
              <th>Forecast</th>
              <th>Previous</th>
              {/* ... other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {calendarData.map((event) => (
              <tr key={event.date}>
                <td>{event.date}</td>
                <td>{event.symbol}</td>
                <td>{event.importance}</td>
                <td>{event.actual}</td>
                <td>{event.forecast}</td>
                <td>{event.previous}</td>
                {/* ... other table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EconomicCalendar;
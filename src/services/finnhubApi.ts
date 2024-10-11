import axios from 'axios';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY; // Use Vite's environment variable
const BASE_URL = 'https://finnhub.io/api/v1';

interface EconomicCalendarEvent {
  // Define the structure of the calendar data
  symbol: string;
  date: string;
  importance: string;
  actual: number | null;
  forecast: number | null;
  previous: number | null;
  // ... other properties as needed
}

const getEconomicCalendar = async (from: string, to: string, country: string): Promise<EconomicCalendarEvent[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/calendar`, {
      params: {
        from,
        to,
        country,
      },
      headers: {
        'X-Finnhub-Secret': API_KEY, // Authentication header
      },
      timeout: 5000, // Set a reasonable timeout
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data; // Assuming the response is an array of events
    } else {
      throw new Error(`API call failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching economic calendar data:', error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

export default {
  getEconomicCalendar,
  // ... add other API functions as needed
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AverageCalculator({ apiUrl }) {
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [average, setAverage] = useState(null);

  const windowSize = 10; // Adjust window size as needed

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setNumbers(response.data);
      } catch (error) {
        console.error('Error fetching numbers:', error);
        setError('Network Error: Failed to fetch data.'); // Clearer error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchNumbers();
  }, [apiUrl]);

  useEffect(() => {
    if (numbers.length >= windowSize) {
      const windowNumbers = numbers.slice(numbers.length - windowSize, numbers.length);
      const sum = windowNumbers.reduce((acc, num) => acc + num, 0);
      setAverage(sum / windowSize);
    } else {
      setAverage(null);
    }
  }, [numbers, windowSize]);

  const handleAddNumber = async (newNumber) => {
    try {
      // Simulate adding a number to the server (replace with actual API call)
      const response = await axios.post(`${apiUrl}/${newNumber}`);
      setNumbers([...numbers, response.data]); // Add new number to local state
    } catch (error) {
      console.error('Error adding number:', error);
      setError('Failed to add number.'); // Clearer error message
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      {isLoading && <p>Loading numbers...</p>}
      {error && <p className="error">Error: {error}</p>}
      {numbers.length > 0 && (
        <>
          <p>Numbers: {numbers.join(', ')}</p>
          {average !== null && <p>Average: {average.toFixed(2)}</p>}
          <button onClick={() => handleAddNumber(Math.floor(Math.random() * 100) + 1)}>
            Add Random Number
          </button>
        </>
      )}
    </div>
  );
}

export default AverageCalculator;

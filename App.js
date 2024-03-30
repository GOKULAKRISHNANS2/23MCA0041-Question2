import React, { useState, useEffect } from 'react';
import AverageCalculator from './components/AverageCalculator';

// Replace with your actual API endpoint URL
const API_URL = 'http://localhost:9876/numbers';

function App() {
  return (
    <div className="App">
      <AverageCalculator apiUrl={API_URL} />
    </div>
  );
}

export default App;

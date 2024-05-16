import React, { useState } from 'react';
import DayNightToggle from 'react-day-and-night-toggle';
import './css/mode.css'; 

const Mode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode and update the body class
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode); // Add or remove 'dark-mode' class to body
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <DayNightToggle
        onChange={toggleDarkMode}
        checked={isDarkMode}
      />
      <h1>My App</h1>
      <p>This is my app content.</p>
    </div>
  );
};

export default Mode;

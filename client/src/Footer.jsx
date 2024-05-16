import React, { useState, useEffect } from 'react';
import DayNightToggle from 'react-day-and-night-toggle';
import './css/Footer.css';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Apply dark mode styles on toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <DayNightToggle
          onChange={toggleDarkMode}
          checked={isDarkMode}
          className="mode-toggle"
        />
        <p>&copy; 2024 Commercial Bank of Ceylon. All rights reserved.</p>
      </div>
    </footer>
  );
}

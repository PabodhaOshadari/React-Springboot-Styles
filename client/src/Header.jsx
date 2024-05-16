import React, { useState, useEffect } from 'react';
import logo from './images/banklogo.png';
import './css/Header.css';

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Function to update current date and time every second
    const updateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    };

    // Update current date and time initially
    updateTime();

    // Update current date and time every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="FitConnectLogo" />
        </div>
        <div className="date-time-box">
          <p>{currentDateTime}</p>
        </div>
      </header>
    </div>
  );
}

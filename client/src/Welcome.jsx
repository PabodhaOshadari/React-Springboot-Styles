// Welcome.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";


import './css/Welcome.css';

function Welcome() {
  useEffect(() => {
    const letters = document.querySelectorAll('.container h1 span');
    let currentLetterIndex = 0;

    const intervalId = setInterval(() => {
      // Reset color of previous letter
      if (currentLetterIndex > 0) {
        letters[currentLetterIndex - 1].style.color = 'blue';
      }

      // Change color of current letter
      letters[currentLetterIndex].style.color = '#8fb2db';

      currentLetterIndex++;

      // Reset index and restart animation
      if (currentLetterIndex === letters.length) {
        currentLetterIndex = 0;
      }
    }, 100); // Adjust the interval duration as needed

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);



  const handleRegisterClick = () => {
    // Redirect to the register page when the button is clicked
    history.push("/register");
  };

  return (
   
    <div className="background-container">
      <div className="background-image"></div>
      <div className="container">
      <div className="transparent-box">
        <h1>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>M</span>
          <span>E</span>
          <span>R</span>
          <span>C</span>
          <span>I</span>
          <span>A</span>
          <span>L</span>
          <span>&nbsp;</span>
          <span>B</span>
          <span>A</span>
          <span>N</span>
          <span>K</span>
          <span>&nbsp;</span>
          <span>O</span>
          <span>F</span>
          <span>&nbsp;</span>
          <span>C</span>
          <span>E</span>
          <span>Y</span>
          <span>L</span>
          <span>O</span>
          <span>N</span>
          <span>&nbsp;</span>
          <span>P</span>
          <span>L</span>
          <span>C</span>
        </h1>
        <div>
         <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
          <Link to="/userlist" className="button">Dashboard</Link>
        
         
         
        </div>
      </div>
    </div>
    </div>
  );
}

export default Welcome;

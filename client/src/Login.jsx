import React, { useState } from 'react';
import './css/login.css'; // Import your CSS file

const Login = () => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState(''); // Add state for password
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleNicChange = (event) => {
    setNic(event.target.value);
    setShowMessageBox(true); // Show message box when user starts typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Update password state
  };

  const handleLoginButtonClick = async (event) => {
    event.preventDefault(); // Prevent form submission
    
    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nic, password }), // Use the password state
      });
  
      if (response.ok) {
        const data = await response.json();
        setLoginSuccess(true);
        setLoginError('');
      } else {
        const errorData = await response.json();
        setLoginSuccess(false);
        setLoginError(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginSuccess(false);
      setLoginError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginButtonClick}>
        <h2>LOGIN</h2>
        <div className="form-group">
          <label htmlFor="nic">Username:</label>
          <div className="centered-input">
            <input
              type="text"
              id="nic"
              value={nic}
              onChange={handleNicChange}
              required
            />
          </div>
          {showMessageBox && (
            <div className="message-box">
              {/* Add your message box content here */}
              <p>Enter your NIC as username</p>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="centered-input">
            <input
              type="password"
              id="password"
              name="password"
              value={password} // Bind the password state
              onChange={handlePasswordChange} // Handle password changes
              required
            />
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {/* Display login success or failure message */}
        {loginSuccess && <p>Login successful!</p>}
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;

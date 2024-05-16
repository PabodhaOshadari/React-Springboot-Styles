import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import EmojiRain from './EmojiRain';

import './css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nic: '',
    name: '',
    accountNumber: '',
    accountType: '',
    email: '',
    password: '' // Added password field to form data
  });
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/users', formData);
      console.log('User registered successfully:', response.data);
      setSuccessMessage('Form submitted successfully!');
      setShowPopup(true);
      // Optionally, you can reset the form after successful submission
      setFormData({
        nic: '',
        name: '',
        accountNumber: '',
        accountType: '',
        email: '',
        password: '' // Reset password field
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <center><h2>REGISTER</h2></center>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="nic">NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="account-number-input" // Make sure this class is applied correctly
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountType">Account Type:</label>
            <input
              type="text"
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Create Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="button1">Submit</button>
        </form>
        
      </div>
      
      {showPopup && <Popup message={successMessage} />}
      {showPopup && <EmojiRain />} {/* Display EmojiRain component when showPopup is true */}
    </div>
  );
};

export default Register;

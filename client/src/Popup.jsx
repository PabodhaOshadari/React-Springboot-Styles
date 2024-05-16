// Popup.js
import React from 'react';
import './css/Popup.css'; // Make sure the path is correct

const Popup = ({ message }) => {
    return (
        <div className="popup-container">
            <div className="popup">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Popup;

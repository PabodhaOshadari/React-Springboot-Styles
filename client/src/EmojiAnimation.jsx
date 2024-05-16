// EmojiAnimation.js
import React, { useState, useEffect } from 'react';
import './css/EmojiAnimation.css'; // Make sure the path is correct

const EmojiAnimation = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 60000); // Hide emojis after 1 minute

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="emoji-animation" style={{ display: isVisible ? 'block' : 'none' }}>
            😊😄🎉
        </div>
    );
};

export default EmojiAnimation;

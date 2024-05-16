import React, { useEffect } from 'react';
import './css/EmojiRain.css';

const EmojiRain = () => {
  useEffect(() => {
    let emojis = document.querySelectorAll('.emoji');

    emojis.forEach(emoji => {
      let x = Math.floor(Math.random() * window.innerWidth);
      let y = Math.floor(Math.random() * window.innerHeight);
      let fallSpeed = Math.random() * 3 + 1;

      emoji.style.left = x + 'px';
      emoji.style.top = y + 'px';

      setInterval(() => {
        y += fallSpeed;
        if (y > window.innerHeight) {
          y = -10;
          x = Math.floor(Math.random() * window.innerWidth);
        }
        emoji.style.left = x + 'px';
        emoji.style.top = y + 'px';
      }, 50);
    });
  }, []);

  return (
    <div className="emoji-container">
      {[...Array(10)].map((_, index) => (
        <div className="emoji" key={index}>😊</div>
      ))}
    </div>
  );
};

export default EmojiRain;

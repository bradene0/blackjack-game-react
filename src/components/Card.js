// Card.js
import React from 'react';
import './Card.css';

const Card = ({ value, suit }) => {
  return (
    <div className={`card ${suit}`}>
      <p>{value}</p>
    </div>
  );
};

export default Card;

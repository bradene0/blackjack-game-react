// Player.js
import React from 'react';
import Card from './Card';

const Player = ({ cards }) => {
  return (
    <div>
      <h2>Player</h2>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
};

export default Player;

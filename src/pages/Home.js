// Home.js
import React from 'react';

const Home = ({ navigateTo }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigateTo('game')}>Go to Game</button>
    </div>
  );
};

export default Home;

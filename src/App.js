// App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import Game from '../src/components/Game';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'game':
        return <Game navigateTo={navigateTo} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default App;

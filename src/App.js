// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css'; // You can create this file for global styles

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
      </Switch>
    </Router>
  );
};

export default App;

// Game.js
import React, { useState, useEffect } from 'react';
import Player from '../components/Player';
import Dealer from '../components/Dealer';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const Game = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameOver(false);
    dealCard('player', 2);
    dealCard('dealer', 2);
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  const dealCard = (recipient, numCards) => {
    const newCards = [];
    for (let i = 0; i < numCards; i++) {
      const randomSuit = suits[Math.floor(Math.random() * suits.length)];
      const randomValue = values[Math.floor(Math.random() * values.length)];
      newCards.push({ suit: randomSuit, value: randomValue });
    }

    if (recipient === 'player') {
      setPlayerCards((prevCards) => [...prevCards, ...newCards]);
    } else if (recipient === 'dealer') {
      setDealerCards((prevCards) => [...prevCards, ...newCards]);
    }
  };

  const calculateTotal = (hand) => {
    let total = 0;
    let aceCount = 0;

    for (const card of hand) {
      if (card.value === 'A') {
        aceCount++;
        total += 11;
      } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
        total += 10;
      } else {
        total += parseInt(card.value, 10);
      }
    }

    // Handle aces
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount--;
    }

    return total;
  };

  const playerTotal = calculateTotal(playerCards);
  const dealerTotal = calculateTotal(dealerCards);

  const checkBlackjack = (hand) => {
    return hand.length === 2 && calculateTotal(hand) === 21;
  };

  const checkBust = (hand) => {
    return calculateTotal(hand) > 21;
  };

  const playerTurn = () => {
    if (checkBlackjack(playerCards)) {
      setGameOver(true);
      return;
    }

    if (checkBust(playerCards)) {
      setGameOver(true);
      // Handle dealer winning logic
      return;
    }
  };

  const dealerTurn = () => {
    if (checkBlackjack(dealerCards)) {
      setGameOver(true);
      // Handle player winning logic
      return;
    }

    while (calculateTotal(dealerCards) < 17) {
      dealCard('dealer', 1);
    }

    if (checkBust(dealerCards) || calculateTotal(dealerCards) < playerTotal) {
      // Handle player winning logic
    } else if (calculateTotal(dealerCards) > playerTotal) {
      // Handle dealer winning logic
    } else {
      // Handle push/tie
    }

    setGameOver(true);
  };

  const calculateWinner = () => {
    if (checkBust(playerCards)) {
      return 'Dealer Wins!';
    } else if (checkBust(dealerCards)) {
      return 'Player Wins';
    } else if (playerTotal > dealerTotal) {
      return 'Player Wins';
    } else if (playerTotal < dealerTotal) {
      return 'Dealer Wins!';
    } else {
      return 'Push! It\'s a tie';
    }
  };

  const hit = () => {
    dealCard('player', 1);
    playerTurn();
  };

  const stand = () => {
    dealerTurn();
  };

  const split = () => {
    // Implement splitting logic
  };

  const doubleDown = () => {
    // Implement doubling down logic
  };

  return (
    <div>
      <Player cards={playerCards} />
      <p>Player Total: {playerTotal}</p>
      <Dealer cards={dealerCards} />
      <p>Dealer Total: {dealerTotal}</p>
      {!gameOver && (
        <div>
          <button onClick={hit}>Hit</button>
          <button onClick={stand}>Stand</button>
          <button onClick={split}>Split</button>
          <button onClick={doubleDown}>Double Down</button>
        </div>
      )}
      {gameOver && (
        <div>
          <p>{calculateWinner()}</p>
          <button onClick={() => startGame()}>Start New Game</button>
        </div>
      )}
    </div>
  );
};

export default Game;

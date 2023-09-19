import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import styles from "./App.module.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameState, setGameState] = useState({
    cards: [],
    flippedCards: [],
    matchedPairs: [],
    errors: 0,
    successes: 0,
    gameWon: false,
  });

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = gameState.flippedCards;
      const firstCard = gameState.cards[firstCardIndex];
      const secondCard = gameState.cards[secondCardIndex];

      if (firstCard.id === secondCard.id) {
        const newMatchedPairs = [...gameState.matchedPairs, firstCard.id];
        setGameState((prevState) => ({
          ...prevState,
          matchedPairs: newMatchedPairs,
          flippedCards: [],
          successes: prevState.successes + 1,
        }));

        if (newMatchedPairs.length === gameState.cards.length / 2) {
          setGameState((prevState) => ({
            ...prevState,
            gameWon: true,
          }));
        }
      } else {
        setTimeout(() => {
          setGameState((prevState) => ({
            ...prevState,
            flippedCards: [],
            errors: prevState.errors + 1,
          }));
        }, 1000); // Retraso para que los jugadores vean las tarjetas no coincidentes antes de voltearse
      }
    } else if (gameState.flippedCards.length === 3) {
      // Si se hacen clic en tres cartas, volvemos a voltear las dos primeras.
      setGameState((prevState) => ({
        ...prevState,
        flippedCards: [gameState.flippedCards[2]],
      }));
    }
  }, [gameState]);

  const startGame = () => {
    const availableCards = [
      { id: 1, name: "Carta 1", image: "imagen1.jpg" },
      { id: 2, name: "Carta 2", image: "imagen2.jpg" },
      // Agrega más cartas duplicadas aquí...
    ];

    // Función para barajar un array utilizando el algoritmo de Fisher-Yates
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledCards = shuffle([...availableCards, ...availableCards]);

    setGameState({
      cards: shuffledCards,
      flippedCards: [],
      matchedPairs: [],
      errors: 0,
      successes: 0,
      gameWon: false,
    });
  };

  const handleCardClick = (cardIndex) => {
    if (gameState.flippedCards.length === 2 || gameState.flippedCards.includes(cardIndex)) {
      return;
    }

    const newFlippedCards = [...gameState.flippedCards, cardIndex];
    setGameState((prevState) => ({
      ...prevState,
      flippedCards: newFlippedCards,
    }));
  };

  return (
    <main className={styles.section}>
      <section className={styles.container}>
      <h1 className="text-3xl font-bold underline">Memory Game</h1>
      {!playerName && (
        <div>
          <input
            type="text"
            placeholder="Ingrese su nombre"
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={startGame}>Comenzar el juego</button>
        </div>
      )}
      {playerName && !gameState.gameWon && (
        <div className={styles.layout}>
          <Scoreboard
            playerName={playerName}
            errors={gameState.errors}
            successes={gameState.successes}
          />
          <Board
            cards={gameState.cards}
            flippedCards={gameState.flippedCards}
            onCardClick={handleCardClick}
          />
        </div>
      )}
      {gameState.gameWon && (
        <div>
          <h2>Felicidades, {playerName}!</h2>
          <p>Has ganado el juego.</p>
        </div>
      )}
      </section>
    </main>
  );
}

export default App;

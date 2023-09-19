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

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchAnimalImages = async () => {
    try {
      const response = await fetch("https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20");
      if (!response.ok) {
        throw new Error("Error al cargar las imágenes de animales");
      }
      const data = await response.json();
      console.log('data::::::::::', data);

      const animalUrls = data.entries.map((entry) => entry.fields.image.url);
      console.log('animalUrls::::::::::', animalUrls);


      const shuffledUrls = shuffle(animalUrls);

      console.log('shuffledUrls::::::::::', shuffledUrls);

      const cards = shuffledUrls.map((url, index) => ({
        id: index,
        name: `Carta ${index + 1}`,
        image: url,
      }));
      console.log('cards::::::::::', cards);
      setGameState((prevState) => ({ ...prevState, cards }));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAnimalImages();
  });

  /*useEffect(() => {
    // Lógica del juego para manejar el emparejamiento y volteo de cartas
    // ...

  }, [gameState]);*/

  const startGame = () => {
    const availableCards = gameState.cards;

    // Función para barajar un array utilizando el algoritmo de Fisher-Yates
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledCards = shuffle([...availableCards]);

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
    const { cards, flippedCards, matchedPairs, errors, successes } = gameState;

    if (flippedCards.length === 2 || flippedCards.includes(cardIndex)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardIndex];
    setGameState((prevState) => ({
      ...prevState,
      flippedCards: newFlippedCards,
    }));

    if (newFlippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = newFlippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.id === secondCard.id) {
        const newMatchedPairs = [...matchedPairs, firstCard.id];
        setGameState((prevState) => ({
          ...prevState,
          matchedPairs: newMatchedPairs,
          flippedCards: [],
          successes: prevState.successes + 1,
        }));

        if (newMatchedPairs.length === cards.length / 2) {
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
    }
  };

  console.log('gameState', gameState);

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

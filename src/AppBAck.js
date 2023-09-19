import React, { useState } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [cards, setCards] = useState({
    playerName: playerName,
    cards: shuffledCards,
    flippedCards: [],
    matchedPairs: [],
    errors: 0,
    successes: 0,
    gameWon: false,
  });
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [errors, setErrors] = useState(0);
  const [successes, setSuccesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const startGame = () => {
    // Cartas disponibles en el juego (personaliza según tus necesidades)
    const availableCards = [
      { id: 1, name: 'Carta 1', image: 'imagen1.jpg' },
      { id: 2, name: 'Carta 2', image: 'imagen2.jpg' },
      // Agrega más cartas duplicadas aquí...
    ];

    // Duplicar las cartas y barajarlas
    const shuffledCards = shuffle([...availableCards, ...availableCards]);

    // Inicializar el estado del juego
    // eslint-disable-next-line no-undef
    /*setState({
      playerName: playerName,
      cards: shuffledCards,
      flippedCards: [],
      matchedPairs: [],
      errors: 0,
      successes: 0,
      gameWon: false,
    });*/
  };

  // Función para barajar un array utilizando el algoritmo de Fisher-Yates
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  const handleCardClick = (cardIndex) => {
    const { cards, flippedCards, matchedPairs, errors, successes } = gameState;

    // Verifica si la carta ya está boca arriba o si se han volteado dos cartas
    if (flippedCards.length === 2 || flippedCards.includes(cardIndex)) {
      return; // No hacer nada si se hacen clics adicionales en la misma carta o si ya hay dos cartas volteadas
    }

    // Voltea la carta clicada
    const newFlippedCards = [...flippedCards, cardIndex];

    // Actualiza el estado con las cartas volteadas
    setGameState({ ...gameState, flippedCards: newFlippedCards });

    // Si se han volteado dos cartas, verifica si coinciden
    if (newFlippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = newFlippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      // Compara las cartas por su contenido (puedes personalizar la lógica según tus datos)
      if (firstCard.id === secondCard.id) {
        // Las cartas coinciden
        const newMatchedPairs = [...matchedPairs, firstCard.id];

        // Actualiza el marcador de aciertos
        setGameState({
          ...gameState,
          matchedPairs: newMatchedPairs,
          flippedCards: [],
          successes: successes + 1,
        });

        // Verifica si el jugador ha ganado el juego
        if (newMatchedPairs.length === cards.length / 2) {
          setGameState({ ...gameState, gameWon: true });
        }
      } else {
        // Las cartas no coinciden, aumenta el contador de errores
        setGameState({ ...gameState, flippedCards: [], errors: errors + 1 });
      }
    }
  };


  return (
    <div className="App">
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
      {playerName && !gameWon && (
        <div>
          <Scoreboard playerName={playerName} errors={errors} successes={successes} />
          <Board cards={cards} flippedCards={flippedCards} onCardClick={handleCardClick} />
        </div>
      )}
      {gameWon && (
        <div>
          <h2>Felicidades, {playerName}!</h2>
          <p>Has ganado el juego.</p>
        </div>
      )}
    </div>
  );
}

export default App;

import React from 'react';
import Card from './Card';

/*function Board({ cards, flippedCards, onCardClick }) {
  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedCards.includes(index)}
          onCardClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}*/


function Board({ cards, flippedCards, onCardClick }) {
  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedCards.includes(index)}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default Board;

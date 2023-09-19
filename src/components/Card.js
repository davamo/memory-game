import React, { useState } from "react";
/*function Card({ card, isFlipped, onCardClick }) {
  const handleClick = () => {
    // Llama a la función onCardClick cuando se hace clic en la carta
    onCardClick(card);
  };

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => !isFlipped && handleClick()}
    >
      {isFlipped ? <img src={card.image} alt={card.name} /> : 'Carta boca abajo'}
    </div>
  );
}
*/

function Card({ card, isFlipped, onCardClick }) {
  const [isCardFlipped, setIsCardFlipped] = useState(isFlipped);

  const handleCardClick = () => {
    if (!isCardFlipped) {
      setIsCardFlipped(true);
      onCardClick(card.index);
    }
  };

  return (
    <div
      className={`${
        isCardFlipped ? "bg-white" : "bg-blue-500"
      } w-24 h-32 m-2 rounded-md cursor-pointer`}
      onClick={handleCardClick}
    >
      {isCardFlipped ? (
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          Tarjeta boca abajo
        </div>
      )}
    </div>
  );
}

export default Card;

import React from 'react';

function Scoreboard({ playerName, errors, successes }) {
  return (
    <div className="scoreboard">
      <h2>Marcador</h2>
      <div>
        <strong>Jugador:</strong> {playerName}
      </div>
      <div>
        <strong>Errores:</strong> {errors}
      </div>
      <div>
        <strong>Aciertos:</strong> {successes}
      </div>
    </div>
  );
}

export default Scoreboard;

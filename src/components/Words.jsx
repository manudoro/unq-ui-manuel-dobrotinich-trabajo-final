import Word from "./Word";
import "./Words.css";
import { useEffect, useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

const Words = () => {
  const { failed, setFailed, fetching, resetGame, gameOver, winner, tries } =
    useContext(GameContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowModal(true);
      }, 1000);
      return;
    }
  }, [gameOver]);

  const handleClose = () => {
    setTimeout(() => {
      setFailed(false);
    }, 650);
  };

  useEffect(() => {
    if (failed) {
      handleClose();
    }
  }, [failed]);

  return (
    <div className="word-guesses">
      {failed && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Word not found in dictionary</h2>
          </div>
        </div>
      )}
      {fetching && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Loading...</h2>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {winner ? "Congratulations! You won!" : "Game Over! Try again."}
            </h2>
            {winner && <h3>Attemps: {tries}</h3>}
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
      <div className="word-list">
        {[...Array(6)].map((_, i) => (
          <Word key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Words;

import Word from "./Word";
import Modal from "./Modal";
import "./Words.css";
import { useEffect, useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

const Words = () => {
  const {
    failed,
    setFailed,
    fetching,
    resetGame,
    gameOver,
    winner,
    tries,
    notEnoughLetters,
  } = useContext(GameContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowModal(true);
      }, 1200);
    }
  }, [gameOver]);

  const handleClose = () => {
    setTimeout(() => {
      setFailed(false);
    }, 900);
  };

  useEffect(() => {
    if (failed) {
      handleClose();
    }
  }, [failed]);

  return (
    <div className="word-guesses">
      {(notEnoughLetters || failed) && (
        <div id="wordle-toast" class="wordle-toast hidden">
          {notEnoughLetters && <p>Not enough letters!</p>}
          {failed && <p>Word not found in dictionary</p>}
        </div>
      )}
      <Modal show={showModal}>

        {showModal && (
          <div>
            <h2>
              {winner ? "Congratulations! You won!" : "Game Over! Try again."}
            </h2>
            {winner && <h3>Attempts: {tries}</h3>}
            <div className="modal-buttons">
              <button onClick={resetGame}>Play Again</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </Modal>
      <div className="word-list">
        {[...Array(6)].map((_, i) => (
          <Word key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Words;

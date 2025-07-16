import { useContext } from "react";
import DifficultyPicker from "./DifficultyPicker";
import Words from "./Words";
import Keyboard from "./Keyboard";
import "./Words.css"; // Assuming you have some styles for the game
import { GameContext } from "../context/GameContext";
import GameTitle from "../assets/Wordle.svg";

const Game = () => {
  const { difficulty, resetGame } = useContext(GameContext);

  return (
    <div className="game">
      {!difficulty ? (
        <div className="game-title-container">
          <DifficultyPicker />
        </div>
      ) : (
        <div className="game-container">
          <div className="header-image-container">
            <img
              src={GameTitle}
              alt="Wordle Title"
              className="game-header"
              onClick={() => resetGame()}
            />
          </div>
          <div className="game-header">
            <h3>Difficulty: {difficulty?.name}</h3>
            <button onClick={() => resetGame()}>Reset Game</button>
            
          </div>
          <Words />
          <Keyboard />
        </div>
      )}
    </div>
  );
};

export default Game;

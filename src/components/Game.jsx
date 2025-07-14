import { useContext } from "react";
import DifficultyPicker from "./DifficultyPicker";
import Words from "./Words";
import Keyboard from "./Keyboard";
import "./Words.css"; // Assuming you have some styles for the game
import { GameContext } from "../context/GameContext";


const Game = () => {
    const {
    difficulty,
  } = useContext(GameContext);
  


  return (
    <div>
      <h1>Wordle</h1>
      {!difficulty ? (
        <DifficultyPicker />
      ) : (
        <div className="game-container">
          <h2>Difficulty: {difficulty?.name}</h2>
          <Words/>
          <Keyboard/>
        </div>
      )}
    </div>
  );
};

export default Game;

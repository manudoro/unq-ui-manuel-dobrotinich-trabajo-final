import { useContext } from "react";
import "./DifficultyPicker.css"; // Assuming you have some styles for the DifficultyPicker
import { GameContext } from "../context/GameContext";
import GameTitle from "../assets/Wordle.svg";


const DifficultyPicker = () => {
  const { difficulties, setDifficulty } = useContext(GameContext);

  return (
    <div className="difficulty-picker">
      <div className="image-container">
        <img src={GameTitle} alt="Wordle Title" className="game-title" />
      </div>
      <h2>Select Difficulty</h2>
      <div className="difficulty-options">
        {difficulties.map((difficulty) => (
          <button key={difficulty.id} onClick={() => setDifficulty(difficulty)}>
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyPicker;

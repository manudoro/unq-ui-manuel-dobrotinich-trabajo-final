import { useContext } from "react";
import "./DifficultyPicker.css"; // Assuming you have some styles for the DifficultyPicker
import { GameContext } from "../context/GameContext";



const DifficultyPicker = () => {
  const { difficulties, setDifficulty } = useContext(GameContext);
  

  return (
    <div className="difficulty-picker">
      <h2>Select Difficulty</h2>
      <div className="difficulty-options">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.id}
            onClick={() => setDifficulty(difficulty)}
          >
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultyPicker;
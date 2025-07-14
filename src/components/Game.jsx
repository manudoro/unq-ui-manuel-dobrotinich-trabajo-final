import { useState, useEffect } from "react";
import DifficultyPicker from "./DifficultyPicker";

const Game = () => {
  const [difficulty, setDifficulty] = useState(null);

    useEffect(() => {
  console.log("Selected Difficulty:", difficulty);
    }, [difficulty]);

  return (
    <div>
      <h1>Wordle</h1>
      {!difficulty ? (
      <DifficultyPicker setDifficulty={setDifficulty} />
      ):(
        <div>
          <h2>Game Component: {difficulty?.name}</h2>
        </div>
      )
    }
    </div>
  );
};

export default Game;

import { useState, useEffect } from "react";
import DifficultyPicker from "./DifficultyPicker";
import Words from "./Words";
import Keyboard from "./Keyboard";
import { fetchGameSession } from "../service/GameService";
import "./Words.css"; // Assuming you have some styles for the game

const Game = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [previousWords, setPreviousWords] = useState([]);


  const fetchGameSessionData = async () => {
    try {
      const session = await fetchGameSession(difficulty?.id);
      setSessionData(session);
    } catch (error) {
      console.error("Error fetching game session:", error);
    }
  };

  useEffect(() => {
    if (!difficulty) return;
    fetchGameSessionData();
  }, [difficulty]);

  const handleSetPreviousWords = (word) => {
    if (word.length == sessionData?.wordLenght && previousWords.length < 6) {
    setPreviousWords((prev) => [...prev, word]);
    setCurrentWord("");
    }

  };

  return (
    <div>
      <h1>Wordle</h1>
      {!difficulty ? (
        <DifficultyPicker setDifficulty={setDifficulty} />
      ) : (
        <div className="game-container">
          <h2>Difficulty: {difficulty?.name}</h2>
          <Words wordLength={sessionData?.wordLenght} />
          <Keyboard wordLength={sessionData?.wordLenght} inputText={currentWord} setInputText={setCurrentWord} enterWord={handleSetPreviousWords}/>
        </div>
      )}
    </div>
  );
};

export default Game;

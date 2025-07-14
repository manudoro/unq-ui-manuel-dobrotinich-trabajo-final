import { useState, useEffect, use } from "react";
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
  const [tries, setTries] = useState(0);


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
    setTries((prev) => prev + 1);
    setCurrentWord("");
    }

  };

  useEffect(() => {
    if (tries >= 6) {
      alert("Game Over! You've used all your tries.");
      setDifficulty(null);
      setSessionData(null);
      setCurrentWord("");
      setPreviousWords([]);
      setTries(0);
      return;
    }
  }, [tries]);  

  return (
    <div>
      <h1>Wordle</h1>
      {!difficulty ? (
        <DifficultyPicker setDifficulty={setDifficulty} />
      ) : (
        <div className="game-container">
          <h2>Difficulty: {difficulty?.name}</h2>
          <Words wordLength={sessionData?.wordLenght} currentWord={currentWord} tries={tries} previousWords={previousWords} />
          <Keyboard wordLength={sessionData?.wordLenght} inputText={currentWord} setInputText={setCurrentWord} enterWord={handleSetPreviousWords}/>
        </div>
      )}
    </div>
  );
};

export default Game;

import { createContext, useState, useEffect } from "react";
import { fetchGameSession, fetchDifficulties } from "../service/GameService";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [difficulties, setDifficulties] = useState([]);

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

  const fetchDifficultiesData = async () => {
    try {
      const data = await fetchDifficulties();
      setDifficulties(data);
    } catch (error) {
      console.error("Error fetching difficulties:", error);
    }
  };

  useEffect(() => {
    fetchDifficultiesData();
  }, []);

  useEffect(() => {
    if (difficulty) fetchGameSessionData();
  }, [difficulty]);

  const setNewWord = (word) => {
    if (word.length === sessionData?.wordLenght && previousWords.length < 6) {
      setPreviousWords((prev) => [...prev, word]);
      setTries((prev) => prev + 1);
      setCurrentWord("");
    }
  };

  useEffect(() => {
    if (tries >= 6) {
      alert("Game Over! You've used all your tries.");
      resetGame();
    }
  }, [tries]);

  const resetGame = () => {
    setDifficulty(null);
    setSessionData(null);
    setCurrentWord("");
    setPreviousWords([]);
    setTries(0);
  };

  return (
    <GameContext.Provider
      value={{
        difficulties,
        difficulty,
        setDifficulty,
        sessionData,
        currentWord,
        setCurrentWord,
        previousWords,
        tries,
        setNewWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";

import {
  fetchGameSession,
  fetchDifficulties,
  checkAnswer,
  NotFoundWordError,
  NotFoundSessionIdError,
} from "../service/GameService";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [difficulties, setDifficulties] = useState([]);

  const [difficulty, setDifficulty] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [previousWords, setPreviousWords] = useState([]);
  const [tries, setTries] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [failed, setFailed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [letters, setLetters] = useState([]);
  const [notEnoughLetters, setNotEnoughLetters] = useState(false);

  const fetchGameSessionData = async () => {
    try {
      setFetching(true);
      const session = await fetchGameSession(difficulty?.id);
      setSessionData(session);
      setFetching(false);
    } catch (error) {
      console.error("Error fetching game session:", error);
      setFetching(false);
    }
  };

  const checkWord = async (word) => {
    try {
      const result = await checkAnswer(sessionData?.sessionId, word.toLowerCase());
      return result;
    } catch (error) {
      if (error instanceof NotFoundWordError) {
        setFailed(true);
      } else if (error instanceof NotFoundSessionIdError) {
        alert(error.message);
        resetGame();
      } else {
        console.error("Error checking word");
      }
      return null;
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

  const setNewWord = async (word) => {
    if (word.length === sessionData?.wordLenght && !gameOver) {
      setFetching(true);
      const result = await checkWord(word);
      if (!result) {
        setFetching(false);
        return;
      }
      saveLetters(result);
      setPreviousWords((prev) => [...prev, result]);
      setTries((prev) => prev + 1);
      setCurrentWord("");
      if (correctWord(result)) {
        setWinner(true);
        setGameOver(true);
      }
      setFetching(false);
    } else if (word.length < sessionData?.wordLenght && !gameOver) {
      setNotEnoughLetters(true);
      setTimeout(() => {
        setNotEnoughLetters(false);
      }, 800);
    }
  };

  const correctWord = (word) => {
    return word.every((letter) => letter.solution === "correct");
  };

  const saveLetters = (result) => {
    setLetters((prevLetters) => {
      const lettersMap = new Map(prevLetters.map((l) => [l.letter, l]));

      result.forEach((letter) => {
        const existing = lettersMap.get(letter.letter);
        if (
          !existing ||
          (existing.solution !== "correct" &&
            existing.solution !== letter.solution)
        ) {
          lettersMap.set(letter.letter, letter);
        }
      });

      return Array.from(lettersMap.values());
    });
  };

  const resetGame = () => {
    setDifficulty(null);
    setSessionData(null);
    setCurrentWord("");
    setPreviousWords([]);
    setTries(0);
    setFetching(false);
    setFailed(false);
    setGameOver(false);
    setWinner(false);
    setLetters([]);
  };

  useEffect(() => {
    if (tries >= 6) {
      setGameOver(true);
    }
  }, [tries]);

  useEffect(() => {
    fetchDifficultiesData();
  }, []);

  useEffect(() => {
    if (difficulty) fetchGameSessionData();
  }, [difficulty]);

  return (
    <GameContext.Provider
      value={{
        setDifficulty,
        setCurrentWord,
        setNewWord,
        setFailed,
        resetGame,
        difficulty,
        tries,
        difficulties,
        sessionData,
        currentWord,
        previousWords,
        fetching,
        failed,
        gameOver,
        winner,
        letters,
        notEnoughLetters,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

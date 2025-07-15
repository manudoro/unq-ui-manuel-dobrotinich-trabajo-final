import { createContext, useState, useEffect } from "react";
import { fetchGameSession, fetchDifficulties, checkAnswer, NotFoundWordError, NotFoundSessionIdError } from "../service/GameService";
import { set } from "fp-ts";

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
      const result = await checkAnswer(sessionData?.sessionId, word);
      return result;
    } catch (error) {
      if (error instanceof NotFoundWordError) {
        setFailed(true);
      }
      else if (error instanceof NotFoundSessionIdError) {
        alert(error.message);
        resetGame();
      } else {
        console.error("Error checking word");
      }
      return null; 
    }
  };

  const correctWord = (word) => {
    return word.every(letter => letter.solution === "correct");
  };
const saveLetters = (result) => {
  setLetters(prevLetters => {
    const lettersMap = new Map(prevLetters.map(l => [l.letter, l]));
    
    result.forEach(letter => {
      const existing = lettersMap.get(letter.letter);
      if (!existing || 
          (existing.solution !== 'correct' && existing.solution !== letter.solution)) {
        lettersMap.set(letter.letter, letter);
      }
    });

    return Array.from(lettersMap.values());
  });
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

  const setNewWord = async (word) => {
    if (word.length === sessionData?.wordLenght && previousWords.length < 6) {
      setFetching(true);
      const result = await checkWord(word);
      if (!result) {
        setFetching(false);
        return
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
    }
  };

  useEffect(() => {
    if (tries >= 6) {
      setGameOver(true);
    }
  }, [tries]);

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
        fetching,
        failed,
        setFailed,
        resetGame,
        gameOver,
        winner,
        letters
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

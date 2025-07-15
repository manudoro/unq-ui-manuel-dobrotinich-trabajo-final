// keyboard.js
import { useState, useContext } from "react";
import "./Keyboard.css";
import { GameContext } from "../context/GameContext";


const Keyboard = () => {

  const {sessionData, setCurrentWord , currentWord,  setNewWord, fetching, letters} = useContext(GameContext);

  const handleKeyClick = (key) => {
    if (fetching) return;
    if (key === "Enter") {
      handleEnterKey();
    } else if (key === "Delete") {
      handleDeleteKey();
    } else {
      handleRegularKey(key);
    }
  };

  const handleEnterKey = () => {
    setNewWord(currentWord);
    
  };

  const handleDeleteKey = () => {
    if (currentWord.length === 0) {
      return;
    }
    const newContent = currentWord.slice(0, currentWord.length - 1);
    setCurrentWord(newContent);
  };

  const handleRegularKey = (key) => {
    if (currentWord.length === sessionData.wordLenght) {
      return;
    }
    if (!/^[a-zA-ZñÑ]$/.test(key)) return; // Ignora todo lo que no sea una letra

    setCurrentWord(currentWord + key);
  };

  return (
    <div className="keyboard">
      <div className="keyboardcontainer">
        <div className="container">
          <div className="row">
            {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
              (keyvalue) => (
                <div
                  key={keyvalue}
                  className={`key ${letters.find(letter => letter.letter === keyvalue)?.solution || ""}`}
                  onClick={() => handleKeyClick(keyvalue)}

                >
                  <span>{keyvalue}</span>
                </div>
              )
            )}
          </div>
          <div className="row">
            {["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"].map((keyvalue) => (
              <div
                key={keyvalue}
                  className={`key ${letters.find(letter => letter.letter === keyvalue)?.solution || ""}`}
                onClick={() => handleKeyClick(keyvalue)}
              >
                <span>{keyvalue}</span>
              </div>
            ))}
          </div>
          <div className="row">
            {["Enter", "z", "x", "c", "v", "b", "n", "m", "Delete"].map(
              (keyvalue, index) => (
                <div
                  key={index}
                  className={`key ${letters.find(letter => letter.letter === keyvalue)?.solution || ""}`}
                  onClick={() => handleKeyClick(keyvalue)}
                >
                  <span>{keyvalue}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;

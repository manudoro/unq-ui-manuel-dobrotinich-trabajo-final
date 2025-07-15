// keyboard.js
import { useState, useContext } from "react";
import "./Keyboard.css";
import { GameContext } from "../context/GameContext";
import Delete from "../assets/delete.svg"; 

const Keyboard = () => {
  const {
    sessionData,
    setCurrentWord,
    currentWord,
    setNewWord,
    fetching,
    letters,
    winner,
  } = useContext(GameContext);

  const handleKeyClick = (key) => {
    if (fetching || winner) return;
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
    if (!/^[a-zA-ZñÑ]$/.test(key)) return;
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
                  className={`key ${
                    letters.find((letter) => letter.letter === keyvalue)
                      ?.solution || "no-selected"
                  }`}
                  onClick={() => handleKeyClick(keyvalue)}
                >
                  <span>{keyvalue}</span>
                </div>
              )
            )}
          </div>
          <div className="row">
            {["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"].map(
              (keyvalue) => (
                <div
                  key={keyvalue}
                  className={`key ${
                    letters.find((letter) => letter.letter === keyvalue)
                      ?.solution || "no-selected"
                  }`}
                  onClick={() => handleKeyClick(keyvalue)}
                >
                  <span>{keyvalue}</span>
                </div>
              )
            )}
          </div>
          <div className="row">
            {["Enter", "z", "x", "c", "v", "b", "n", "m", "Delete"].map(
              (keyvalue, index) => (
                <div
                  key={index}
                  className={`key ${keyvalue} ${
                    letters.find((letter) => letter.letter === keyvalue)
                      ?.solution || "no-selected"
                  }`}
                  onClick={() => handleKeyClick(keyvalue)}
                >
                  <span>{keyvalue === "Delete" ? <img src={Delete} alt="delete" /> : keyvalue}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;

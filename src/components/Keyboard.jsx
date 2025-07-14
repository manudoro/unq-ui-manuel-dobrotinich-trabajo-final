// keyboard.js
import React, { useState } from "react";
import "./Keyboard.css";

const Keyboard = ({wordLength, setInputText, inputText, enterWord}) => {

  const handleKeyClick = (key) => {
    if (key === "Enter") {
      handleEnterKey();
    } else if (key === "Delete") {
      handleDeleteKey();
    } else {
      handleRegularKey(key);
    }
  };

  const handleEnterKey = () => {
    enterWord(inputText);
    
  };

  const handleDeleteKey = () => {
    if (inputText.length === 0) {
      return;
    }
    const newContent = inputText.slice(0, inputText.length - 1);
    setInputText(newContent);
  };

  const handleRegularKey = (key) => {
    if (inputText.length === wordLength) {
      return;
    }
    if (!/^[a-zA-Z]$/.test(key)) return; // Ignora todo lo que no sea una letra

    setInputText(inputText + key.toUpperCase());
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
                  className="key"
                  onClick={() => handleKeyClick(keyvalue)}
                >
                  <span>{keyvalue}</span>
                </div>
              )
            )}
          </div>
          <div className="row">
            {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((keyvalue) => (
              <div
                key={keyvalue}
                className="key"
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
                  className="key"
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

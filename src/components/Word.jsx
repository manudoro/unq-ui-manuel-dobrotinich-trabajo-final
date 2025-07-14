import "./Words.css"; 
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
const Word = ({ index }) => {
    const { sessionData,currentWord, tries, previousWords } = useContext(GameContext);

  const isCurrentWord = index === tries;



  return (
    <div className="word">
      {[...Array(sessionData?.wordLenght)].map((_, i) => (
        <div key={i} className="letter">{isCurrentWord ?  currentWord[i]: index < tries ? previousWords[index][i] : "" }</div>
        
      ))}
    </div>
  );
};
export default Word;

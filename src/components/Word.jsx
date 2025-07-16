import "./Words.css"; 
import { useContext } from "react";
import { GameContext } from "../context/GameContext";
const Word = ({ index }) => {
    const { sessionData,currentWord, tries, previousWords, fetching , failed, notEnoughLetters} = useContext(GameContext);

  const isCurrentWord = index === tries;



  return (
    <div className="word">
      {[...Array(sessionData?.wordLenght)].map((_, i) => (
        <div key={i} className={`letter ${(failed || notEnoughLetters) && isCurrentWord && "failed"} ${fetching && isCurrentWord && "fetching"} ${index < tries ? "colored" + " " + previousWords[index][i].solution : ""}`}>
          <div className="letter-content">{isCurrentWord ?  currentWord[i]: index < tries ? previousWords[index][i].letter : "" }</div>

        </div>
        
      ))}
    </div>
  );
};
export default Word;

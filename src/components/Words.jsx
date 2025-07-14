
import Word from "./Word";
import "./Words.css"; 

const Words = ({ wordLength, currentWord, tries, previousWords }) => {
  


  return (
    <div className="word-guesses">
      <div className="word-list">
        {[...Array(6)].map((_, i) => (
          <Word key={i} index={i} length={wordLength} currentWord={currentWord} tries={tries} previousWords={previousWords}/>
        ))}
      </div>
    </div>
  );
};

export default Words;

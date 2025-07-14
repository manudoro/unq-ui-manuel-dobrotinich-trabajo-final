
import Word from "./Word";
import "./Words.css"; 

const Words = ({ wordLength }) => {


  return (
    <div className="word-guesses">
      <div className="word-list">
        {[...Array(6)].map((_, i) => (
          <Word key={i} length={wordLength}/>
        ))}
      </div>
    </div>
  );
};

export default Words;

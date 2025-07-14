
import Word from "./Word";
import "./Words.css"; 


const Words = () => {
  


  return (
    <div className="word-guesses">
      <div className="word-list">
        {[...Array(6)].map((_, i) => (
          <Word key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Words;

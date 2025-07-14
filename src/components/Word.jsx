import "./Words.css"; 

const Word = ({ index, length, currentWord, tries, previousWords }) => {

  const isCurrentWord = index === tries;



  return (
    <div className="word">
      {[...Array(length)].map((_, i) => (
        <div key={i} className="letter">{isCurrentWord ?  currentWord[i]: index < tries ? previousWords[index][i] : "" }</div>
        
      ))}
    </div>
  );
};
export default Word;

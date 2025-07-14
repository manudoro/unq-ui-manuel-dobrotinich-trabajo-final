import "./Words.css"; 

const Word = ({ text, length }) => {
  return (
    <div className="word">
      {[...Array(length)].map((_, i) => (
        <div className="letter"></div>
      ))}
    </div>
  );
};
export default Word;

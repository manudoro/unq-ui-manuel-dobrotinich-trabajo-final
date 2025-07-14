import { useState, useEffect } from "react";
import { fetchDifficulties } from "../service/GameService";
import "./DifficultyPicker.css"; // Assuming you have some styles for the DifficultyPicker


const DifficultyPicker = ({ setDifficulty }) => {
  const [difficulties, setDifficulties] = useState([]);

    const fetchDifficultiesData = async () => {
    try {
      const data = await fetchDifficulties();
      setDifficulties(data); // Update the state with fetched difficulties
    } catch (error) {
        
      console.error("Error fetching difficulties:", error);
    }

    };
    useEffect(() => {
    fetchDifficultiesData();
    }, []);


  return (
    <div className="difficulty-picker">
      <h2>Select Difficulty</h2>
      <div className="difficulty-options">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.id}
            onClick={() => setDifficulty(difficulty)}
          >
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultyPicker;
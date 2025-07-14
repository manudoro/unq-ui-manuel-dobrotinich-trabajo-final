import axios from "axios";
const URL = "https://word-api-hmlg.vercel.app/api";

export const fetchDifficulties = async () => {
  try {
    const response = await axios.get(`${URL}/difficulties`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch difficulties"
    );
  }
};


export const fetchGameSession = async ( difficultyId ) => {
  try {
    const response = await axios.get(`${URL}/difficulties/${difficultyId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch game session"
    );
  }
};

export const checkAnswer = async ( sessionId, word ) => {
  try {
    const answerBody = guessDTO(sessionId, word);
    const response = await axios.post(`${URL}/checkWord`, answerBody);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to check answer"
    );
  }
};

const guessDTO = (sessionId, word) => {
    return {
        sessionId: sessionId,
        word: word
    }
}
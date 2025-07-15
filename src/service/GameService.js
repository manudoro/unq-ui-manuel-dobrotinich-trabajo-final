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

export const fetchGameSession = async (difficultyId) => {
  try {
    const response = await axios.get(`${URL}/difficulties/${difficultyId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch game session"
    );
  }
};

export const checkAnswer = async (sessionId, word) => {
  try {
    const answerBody = guessDTO(sessionId, word);
    const response = await axios.post(`${URL}/checkWord`, answerBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          throw new NotFoundWordError(
            "The word does not exist in the dictionary."
          );
        case 404:
          throw new NotFoundSessionIdError("Sesión no encontrada.");
        default:
          throw new Error(
            error.response?.data?.error || "Failed to check the word"
          );
      }
    } else {
      throw new Error(
        error.response?.data?.error || "Failed to check the word"
      );
    }
  }
};

export class NotFoundSessionIdError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundSessionIdError";
  }
}

export class NotFoundWordError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundWordError";
  }
}

const guessDTO = (sessionId, word) => {
  return {
    sessionId: sessionId,
    word: word,
  };
};

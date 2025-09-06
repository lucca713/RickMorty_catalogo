const axios = require("axios");
const { AppError } = require("../utils/errorHandler");

const API_URL = "https://rickandmortyapi.com/api";

//pegar pelo id
const getCharacterById = async (characterId) => {
  try {
    //usando axios pois mais facil de acessar uma api
    const response = await axios.get(`${API_URL}/character/${characterId}`);
    //coloca o json que retorna no data
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new AppError(`Personagem com Id: ${characterId} nao achado`, 404);
    }
    throw new AppError(`A api nao esta funcionando`, 500);
  }
};

//listar todos ids
const getAllCharacter = async (characterIds) => {
  if (!characterIds || characterIds.length === 0) {
    //retornar um array vazio para nao dar erro na api
    return [];
  }
  try {
    const response = await axios.get(
      `${API_URL}/character/${characterIds.join(",")}`
    );
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    throw new AppError("Erro de consultar varios", 500);
  }
};

module.exports = {
  getCharacterById,
  getAllCharacter,
};

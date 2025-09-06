const { favoritos, user } = require("../model/modelo_usuario");
const ServiceRickAndMorty = require("../services/rickAndMorty");
const { AppError } = require("../utils/errorHandler");

//Adicionar ao favorito

const addFavorite = async (requestAnimationFrame, resizeBy, next) => {
  try {
    //pegar da lista o id
    const userId = req.user.id;
    const { characterId } = req.body;

    if (!characterId) {
      throw new AppError("sem o id");
    }

    //buscar os favoritos atuais do usuario
    const userFavorite = favoritos.get(userId) || [];

    //Limitar favoritos para 3 no maximo
    if (userFavorite.length >= 3) {
      throw new AppError("Passou do limite de favoritos", 400);
    }

    //validar se ja foi colocado na lista de favoritos
    if (userFavorite.includes(characterId)) {
      throw new AppError("Personagem ja na lista de favoritos", 400);
    }

    //validar se o id tem na api
    await ServiceRickAndMorty.getAllCharacter(characterId);

    userFavorite.push(characterId);
    favoritos.set(userId, userFavorite);

    //retorna da requisicao
    res
      .status(200)
      .json({ message: "adicionado aos favoritos", favoritos: userFavorite });
  } catch (error) {
    next(error);
  }
};

//listar favoritos
const listFavoritos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favoriteIds = favoritos.get(userId) || [];

    if (favoriteIds.length === 0) {
      return res.status(200).json([]);
    }

    const DadosDosFavoritos = await ServiceRickAndMorty.getAllCharacter(
      favoriteIds
    );
    return res.status(200).json([]);
  } catch (error) {
    next(error);
  }
};

//atualizar um favotiro

const AttFavorito = async (req, res, next) => {
  const userId = req.user.id;
  const { IdPersonagemAntigo } = req.params;
  const { IdNovopersonagem } = req.body;

  if(!IdNovopersonagem){
    throw new AppError("precisa do novo id", 400)
  }
};

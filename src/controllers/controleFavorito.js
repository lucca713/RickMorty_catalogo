const { favoritos } = require("../model/modelo_usuario");
const ServiceRickAndMorty = require("../services/rickAndMorty");
const { AppError } = require("../utils/errorHandler");

//Adicionar ao favorito

const addFavorite = async (req, res, next) => {
  console.log("Entrou no add");
  try {
    console.log("Entrou no try");
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
      throw new AppError("Personagem ja na lista de favoritos", 409);
    }

    //validar se o id tem na api
    await ServiceRickAndMorty.getCharacterById(characterId);
    console.log("Passou do await");

    userFavorite.push(characterId);
    favoritos.set(userId, userFavorite);

    //retorna da requisicao
    res
      .status(201)
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
    return res.status(200).json(DadosDosFavoritos);
  } catch (error) {
    next(error);
  }
};

//atualizar um favotiro

const AttFavorito = async (req, res, next) => {
  try {
    const userId = req.user.id;
    //le id antigo
    const { characterId } = req.params;
    //le o id novo
    const { IdNovopersonagem } = req.body;

    if (!IdNovopersonagem) {
      throw new AppError("precisa do novo id", 400);
    }

    const userFavorite = favoritos.get(userId) || [];
    const IdAntigo = parseInt(characterId, 10);

    console.log("Inicio debug");
    console.log("ID que estou procurando (tipo):", IdAntigo, typeof IdAntigo);
    console.log("Lista de favoritos no servidor:", userFavorite);


    if (userFavorite.length > 0) {
      console.log("Tipo do primeiro item na lista:", typeof userFavorite[0]);
    }
    console.log("Fim debug");

    const indexUpdate = userFavorite.indexOf(IdAntigo);

    //-1 vai cair se nao estiver na lista
    if (indexUpdate === -1) {
      throw new AppError("nao esta na lista esse personagem para att.", 404);
    }
    if (userFavorite.includes(IdNovopersonagem)) {
      throw new AppError("ele ja esta nos favoritos", 409);
    }
    await ServiceRickAndMorty.getCharacterById(IdNovopersonagem);

    userFavorite[indexUpdate] = IdNovopersonagem;
    favoritos.set(userId, userFavorite);
    res.status(200).json({ message: "Favorito ATT", favoritos: userFavorite });
  } catch (error) {
    next(error);
  }
};

// Remover um favorito
const removeFavorite = (req, res, next) => {
  try {
    const userId = req.user.id;
    const { characterId } = req.params;
    const idRemovido = parseInt(characterId, 10);

    const userFavorites = favoritos.get(userId) || [];
    const updatedFavorito = userFavorites.filter((id) => id !== idRemovido);

    if (userFavorites.length === updatedFavorito.length) {
      throw new AppError("Ele nao foi achado nos favoritos", 404);
    }

    favoritos.set(userId, updatedFavorito);
    res.status(200).json({
      message: "Removido com sucesso dos favoritos",
      favoritos: updatedFavorito,
    });
  } catch (error) {
    next(error);
  }
};

// Saber quantos episódios cada personagem favorito aparece
const favoritoCadaEpisodio = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favoriteIds = favoritos.get(userId) || [];

    if (favoriteIds.length === 0) {
      return res.status(200).json([]);
    }

    const characters = await ServiceRickAndMorty.getAllCharacter(favoriteIds);
    //pega do retorno da requisicao url para pegar todas as info dos personagens
    const episodeCounts = characters.map((Personagem) => ({
      characterId: Personagem.id,
      name: Personagem.name,
      episodeCount: Personagem.episode.length,
    }));

    res.status(200).json(episodeCounts);
  } catch (error) {
    next(error);
  }
};

// Saber quantos episódios todos os favoritos aparecem (contagem única)
const AparicaoUnicaTodos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const favoriteIds = favoritos.get(userId) || [];

    if (favoriteIds.length === 0) {
      return res.status(200).json({ TotalEpUnicos: 0 });
    }

    const characters = await ServiceRickAndMorty.getAllCharacter(favoriteIds);

    const TodosEpsUrl = characters.flatMap((Personagem) => Personagem.episode);
    const UrlEpUnico = new Set(TodosEpsUrl);

    res.status(200).json({ TotalEpUnicos: UrlEpUnico.size });
  } catch (error) {
    next(error);
  }
};

//exportando todos modulos?
module.exports = {
  addFavorite,
  listFavoritos,
  AttFavorito,
  removeFavorite,
  favoritoCadaEpisodio,
  AparicaoUnicaTodos,
};

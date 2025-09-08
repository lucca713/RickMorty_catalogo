// src/routes/favoriteRoutes.js
const express = require("express");
const favoriteController = require("../controllers/controleFavorito");
const { protect } = require("../midllewares/authMiddleware");
const { rateLimit } = require("../midllewares/Limite");

const router = express.Router();

// Todas as rotas de favoritos precisam de autenticação
router.use(protect);

// Rota para consulta geral (aplica rate limit aqui)
router.get("/external/character/:id", rateLimit, (req, res) => {
  // Rota para testar o limite
  const rickAndMortyService = require("../services/rickAndMortyService");
  rickAndMortyService
    .getCharacterById(req.params.id)
    .then((character) => res.json(character))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.post("/", favoriteController.addFavorite);
router.get("/", favoriteController.listFavoritos);
//pegar o id do atual para trocar para o novo
router.put("/:characterId", favoriteController.AttFavorito);
router.delete("/:characterId", favoriteController.removeFavorite);
router.get("/episodes/count", favoriteController.favoritoCadaEpisodio);
router.get("/episodes/unique-count", favoriteController.AparicaoUnicaTodos);

module.exports = router;

// src/routes/index.js
const express = require("express");
const authRoutes = require("./authRoutes");
const favoriteRoutes = require("./favoriteRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/favoritos", favoriteRoutes);

// Rota de exemplo para consulta não autenticada com rate limit
const { rateLimit } = require("../midllewares/Limite");
const rickAndMortyService = require("../services/rickAndMorty");

router.get("/character/:id", rateLimit, async (req, res, next) => {
  try {
    const character = await rickAndMortyService.getCharacterById(req.params.id);
    res.json(character);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

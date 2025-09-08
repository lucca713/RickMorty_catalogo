const express = require("express");

const routes = require("./src/routes");

//desconstruir e pegar a classe erro -> ficar mais facil para tratar os erros
const { handleError } = require("./src/utils/errorHandler");

const app = express();

// para poder usar o json como formato no postman
app.use(express.json());

//primeira e rota principal
app.use("/api", routes);

//tratividade de erro
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;

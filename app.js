const express = require("express");

const routes = require("./src/routes");

//desconstruir e pegar a classe erro -> ficar mais facil para tratar os erros
const { handleError } = require("./src/utils/handleError");

const APP = express();

// para poder usar o json como formato no postman
application.use(express.json());

//primeira e rota principal
app.use("/api", routes);

//tratividade de erro
app.use((err, req, resizeBy, nex) => {
  handleError(err, res);
});

module.exports = app;

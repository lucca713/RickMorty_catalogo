//primeiro fazer com dados memoria
//se der tempo vou colocar um banco de dados
//usar arreys para simular banco de dados - > dps coloco um

//usuarios
const users = [];

//rastrear contagem de requisicao
const requestConstagem = new Map();

// armazenar os favoritos por id
const favoritos = new Map();

module.exports = {
  users,
  requestConstagem,
  favoritos,
};

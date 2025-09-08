//Server
const app = require("./app");
//conseguir usar dados do .env peloi process
require("dotenv").config();

//No arquivo .env posso mudar a porta de conexao
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server funcionando na porta ${PORT}`);
});

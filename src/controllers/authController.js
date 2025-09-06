//CONTROLE DE AUTENTIFICACAO

/* escolhi joi ao invez do express-
validation por ser mais mais facil de se user */
const joi = require("joi");

const userService = require("../services/userService");

//esquema do user, o que vai ser usado em um banco dps
const registroEsquema = joi.object({
  username: joi.string().min(3).required(),
  password: joi.string().min(6).required(),
});

const registro = async (req, res, next) => {
  try {
    //desestrutorar o objeto para voltar a validacao para o body
    const { error, value } = registroEsquema.validate(req.body);

    if (error) {
      const erro = new Error(error.details.message);
      //lancar o codigo do erro
      erro.status = 400;
      throw erro;
    }

    //criar o usuario
    //esperar o usuario ser criado
    const NovoUsuario = await userService.createUser(
      value.username,
      value.password
    );

    //Retorna a resposta
    res.status(201).json({ mensagem: "Usuario criado", ID: NovoUsuario.id });
  } catch (Error) {
    //passar o erro para middleware
    next(Error);
  }
};

const login = async (req, res, next) => {
  try {
    //pega no corpo da requisicao login e senhe e cai no if para ver se tem
    const { username, password } = req.body;
    if (!username || !password) {
      const error = new Error("login ou senha nao foi escrito certo");
      error.status = 400;
      throw error;
    }

    //Aqui vai ser gerado o token criptografado com as informacoes de user e senha
    const { token } = await userService.loginUser(username, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }

  module.exports = {
    registro,
    login,
  };
};

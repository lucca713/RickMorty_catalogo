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
    const novoUsuario = await userService.creatUser(
      value.username,
      value.password
    );
  } catch (Error) {
    //passar o erro para middleware
    next(Error);
  }
};

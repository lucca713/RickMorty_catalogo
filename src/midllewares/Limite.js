const jwt = require("jsonwebtoken");
const { requestConstagem } = require("../model/modelo_usuario");
const { AppError } = require("../utils/errorHandler");

const rateLimit = (req, res, next) => {
  let token;
  let identifier;
  let limit = 3; //numero de tentativas

  //analizar a igualdade dos
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      (identifier = `user: ${decoded}`),
        //limite par autenficacao
        (limit = 10);
      //
    } catch (error) {
      identifier = `ip:${req.ip}`;
    }
  } else {
    //se nao tiver token usa o ip
    identifier = `ip:${req.ip}`;
  }
  //fazer contagem e o retorno

  const contagemAtual = requestConstagem.get(identifier) || 0;

  //contagem validacao
  if (contagemAtual >= limit) {
    return next(new AppError("Passou do limite.", 429));
    //tentar dps incrementar um emoji como alert
  }

  requestConstagem.set(identifier, contagemAtual + 1);
  next();
};
module.exports = { rateLimit };
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZXVwcmltZWlyb3VzZXIiLCJpYXQiOjE3NTcyOTA3NzAsImV4cCI6MTc1NzI5NDM3MH0.O1r_-lGthUkFFXXBSd6nBCSr8t4LLUOBMYOYy5PYIsE
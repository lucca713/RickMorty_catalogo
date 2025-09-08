//json web token
//protecao de rota
const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/errorHandler");

//protect para manter a seguranca
const protect = (req, res, next) => {
  let token;
  //verificacao de credencial -> set em para poder ver o token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("faca o login no ceu acessos", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //add dados do usuario do token
    req.user = decoded;
  } catch (error) {
    return next(new AppError("token invalido.", 401));
  }

};
 module.exports = { protect };
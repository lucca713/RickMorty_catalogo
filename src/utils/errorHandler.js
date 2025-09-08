//Trativa de erro ok
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "erro";
    //sempre retorna fail ok
    this.isOperational = true; // Para diferenciar erros operacionais de bugs

    Error.captureStackTrace(this, this.constructor);
  }
}

// Função que envia o erro formatado
const handleError = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Algo deu errado";

  res.status(statusCode).json({
    status: err.status || "erro",
    message: message,
  });
};

module.exports = {
  AppError,
  handleError,
};

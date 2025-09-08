const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../model/modelo_usuario');
const { AppError } = require('../utils/errorHandler');

const createUser = async (username, password) => {
  // Verificar se o usuário já existe
  const existingUser = user.find((user) => user.username === username);
  if (existingUser) {
    throw new AppError('Usuario ja existe', 409); // Conflict
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: user.length + 1,
    username,
    password: hashedPassword,
  };

  user.push(newUser);
  return newUser;
};

const loginUser = async (username, password) => {
  // Encontrar o usuário
  const user = user.find((user) => user.username === username);
  if (!user) {
    throw new AppError('Usuario invalido', 401); // Unauthorized
  }

  // Verificar a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Senha invalida', 401);
  }

  // Gerar o token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expira em 1 hora
  });

  return { token };
};

module.exports = {
  createUser,
  loginUser,
};
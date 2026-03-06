const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

async function login(request, reply) {
  const { email, password } = request.body || {};

  if (!email || !password) {
    return reply.status(400).send({ message: "Email e password são obrigatórios." });
  }

  const user = await userModel.findByEmail(email);
  if (!user || !user.is_active) {
    return reply.status(401).send({ message: "Credenciais inválidas." });
  }

  const isBcryptHash = user.password_hash && user.password_hash.startsWith("$2");
  const isValid = isBcryptHash
    ? await bcrypt.compare(password, user.password_hash)
    : password === user.password_hash;
  if (!isValid) {
    return reply.status(401).send({ message: "Credenciais inválidas." });
  }

  request.session.user = {
    id: user.id,
    email: user.email
  };

  const profile = await userModel.findById(user.id);
  return reply.send({ user: profile });
}

async function me(request, reply) {
  const sessionUser = request.session.user;
  if (!sessionUser) {
    return reply.status(401).send({ message: "Não autenticado." });
  }

  const profile = await userModel.findById(sessionUser.id);
  if (!profile) {
    await new Promise((resolve, reject) => {
      request.session.destroy((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    return reply.status(401).send({ message: "Sessão inválida." });
  }

  return reply.send({ user: profile });
}

async function logout(request, reply) {
  await new Promise((resolve, reject) => {
    request.session.destroy((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
  return reply.send({ message: "Sessão encerrada com sucesso." });
}

module.exports = {
  login,
  me,
  logout
};

const authController = require("../controllers/authController");

async function authRoutes(fastify) {
  fastify.post("/login", authController.login);
  fastify.get("/me", authController.me);
  fastify.post("/logout", authController.logout);
}

module.exports = authRoutes;

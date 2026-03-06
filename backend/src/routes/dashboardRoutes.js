const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

async function dashboardRoutes(fastify) {
  fastify.get("/summary", { preHandler: ensureAuthenticated }, dashboardController.getSummary);
}

module.exports = dashboardRoutes;

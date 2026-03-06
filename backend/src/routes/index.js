const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");

async function routes(fastify) {
  fastify.get("/health", async () => ({ status: "ok" }));
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(dashboardRoutes, { prefix: "/dashboard" });
}

module.exports = routes;

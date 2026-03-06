const buildApp = require("./app");
const { app } = require("./config/env");

async function start() {
  const fastify = buildApp();
  try {
    await fastify.listen({ port: app.port, host: app.host });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();

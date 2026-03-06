const fastifyFactory = require("fastify");
const cookie = require("@fastify/cookie");
const session = require("@fastify/session");
const cors = require("@fastify/cors");
const formBody = require("@fastify/formbody");
const { app, session: sessionConfig } = require("./config/env");
const routes = require("./routes");

function buildApp() {
  const fastify = fastifyFactory({
    logger: true
  });

  fastify.register(cors, {
    origin: app.frontendUrl,
    credentials: true
  });

  fastify.register(formBody);
  fastify.register(cookie);
  fastify.register(session, {
    secret: sessionConfig.secret,
    cookieName: sessionConfig.cookieName,
    cookie: {
      httpOnly: true,
      secure: app.nodeEnv === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8
    },
    saveUninitialized: false
  });

  fastify.register(routes, { prefix: "/api" });

  return fastify;
}

module.exports = buildApp;

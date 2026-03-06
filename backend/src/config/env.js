const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
  app: {
    port: Number(process.env.PORT || 3021),
    host: process.env.HOST || "0.0.0.0",
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3020"
  },
  session: {
    secret:
      process.env.SESSION_SECRET ||
      "change-this-in-production-please-use-at-least-32-chars",
    cookieName: process.env.SESSION_COOKIE_NAME || "ga_session"
  },
  db: {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "gestor_afiliados"
  }
};

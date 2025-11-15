const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "Development",
  MONGO_URI: process.env.MONGO_URI,
  LOG_DB_URL: process.env.LOG_DB_URL,
};

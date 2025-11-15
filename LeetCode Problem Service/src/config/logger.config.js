const winston = require("winston");
const { LOG_DB_URL } = require("./server.config");
require("winston-mongodb");

const { combine, timestamp, printf, json, colorize } = winston.format;

// Console format: colorful, human-friendly
const consoleFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  colorize({ all: true }),
  printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] : ${message}`;
  })
);

// File format: plain, clean logs
const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] : ${message}`;
  })
);

// MongoDB format: clean JSON
const mongoFormat = combine(
  timestamp(),
  json()
);

const logger = winston.createLogger({
  level: "info", // default level
  transports: [
    // Console logs (with color)
    new winston.transports.Console({
      format: consoleFormat,
    }),

    // File logs (without color)
    new winston.transports.File({
      filename: "logs/app.log", // create a 'logs' folder 
      level: "info", // logs info and above
      format: fileFormat,
    }),

    // Error logs to MongoDB
    new winston.transports.MongoDB({
      level: "error",
      db: LOG_DB_URL,
      options: { useUnifiedTopology: true },
      collection: "error_logs",
      format: mongoFormat,
    }),
  ],
});

module.exports = { logger };

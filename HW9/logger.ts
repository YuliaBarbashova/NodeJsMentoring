import winston from "winston";
import expressWinston from "express-winston";

const env = process.env.NODE_ENV || "development";

// Logger configuration
const logger = winston.createLogger({
  level: env === "test" ? "debug" : env === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "ddd, DD MMM YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `[${info.timestamp}] ${info.level.toUpperCase()} ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  msg: "{{req.method}} {{req.url}} - {{res.responseTime}}ms",
  expressFormat: true,
  colorize: false,
});

export { logger, requestLogger };

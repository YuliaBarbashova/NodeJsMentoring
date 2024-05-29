import express from "express";
import dotenv from "dotenv";
import type { Socket } from "net";
import mongoose = require("mongoose");

import router from "./routes.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { logger, requestLogger } from "./logger.ts";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const uri: string = process.env.URI || "uri not found";

mongoose
  .connect(uri)
  .then(() => {
    logger.info("Succesfully connected to MongoDB");
  })
  .catch((error: Error) => {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(requestLogger);

app.get("/healthcheck", (req, res) => {
  const mongooseState: number = mongoose.connection.readyState;
  const mongooseStateMessage: { [key: number]: string } = {
    0: "MongoDB Disconnected",
    1: "MongoDB Connected",
    2: "MongoDB Connecting",
    3: "MongoDB Disconnecting",
  };
  const mongooseStatus = mongooseStateMessage[mongooseState as number];

  if (mongooseState == 1) {
    res.status(200).send(`Success! App is running and ${mongooseStatus}`);
  } else {
    res.status(500).json({
      status: "DOWN",
      error: `Error: App is not connected properly to MongoDB. Status: ${mongooseStatus}`,
    });
    logger.error(
      `Error: App is not connected properly to MongoDB. Status: ${mongooseStatus}`
    );
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () =>
  logger.info(`Server is running on port ${PORT}`)
);

// Graceful shutdown
let connections: Socket[] = [];

server.on("connection", (connection) => {
  // register connections
  connections.push(connection);

  // remove/filter closed connections
  connection.on("close", () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    );
  });
});

function shutdown() {
  logger.info("Received kill signal, shutting down gracefully");

  server.close(() => {
    logger.info("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 20000);

  // end current connections
  connections.forEach((connection) => connection.end());

  // then destroy connections
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

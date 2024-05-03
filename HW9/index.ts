import express from "express";
import dotenv from "dotenv";
import mongoose = require("mongoose");

import router from "./routes.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const uri: string | undefined = process.env.URI;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Succesfully connected to MongoDB");
    })
    .catch((error: Error) => {
      console.log(`Error connecting to MongoDB: ${error.message}`);
    });

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api", router);

  // Error handling middleware
  app.use(errorHandler);

  // Start server
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

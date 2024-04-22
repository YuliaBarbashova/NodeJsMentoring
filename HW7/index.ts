import express from "express";
// const { MongoClient, ServerApiVersion } = require("mongodb");
import mongoose = require("mongoose");
import router from "./routes.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const PORT = 8000;

const app = express();

const uri: string =
  "mongodb+srv://yuliabarbashova:fTiOkB5mVjOlvJLb@cluster0.0k6us4d.mongodb.net/test";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// DB connection
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

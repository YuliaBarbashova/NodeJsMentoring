import express from "express";
import router from './routes.ts'
import { errorHandler } from "./middlewares/errorHandler.ts";

const PORT = 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
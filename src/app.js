import express from "express";
import routes from "./routes/index.js"
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

//Routes
app.use('/', routes);

// Error handler
app.use(errorHandler);

export default app;

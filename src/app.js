import express from "express";
import routes from "./routes/index.js"

const app = express();

// Middleware to parse JSON
app.use(express.json());

//Routes
app.use('/', routes);

export default app;

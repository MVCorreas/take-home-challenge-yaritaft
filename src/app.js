import express from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// import routes from "./routes/index.js";

const app = express();

// //Get the file path from the module
// const __filename = fileURLToPath(import.meta.url);
// //Get the directory name
// const __dirname = dirname(__filename);

// //Middleware
// app.use(express.json());
// //Say where to find and serve the public folder
// app.use(express.static(path.join(__dirname, "../public")));

// app.use('/', routes);
// // Routes
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

export default app;

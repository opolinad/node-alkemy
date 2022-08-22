import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import charactersRoutes from "./routes/characters.js";
import moviesRoutes from "./routes/movies.js";
import { authenticate } from "./controllers/authController.js";

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use("/auth", authRoutes);

server.use(authenticate);

server.use("/characters", charactersRoutes);
server.use("/movies", moviesRoutes);


export default server;
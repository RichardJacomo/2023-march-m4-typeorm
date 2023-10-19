import express, { Application } from "express";
import "reflect-metadata";
import "dotenv/config";
import router from "../src/routers/movies.routes";
import { handleError } from "./errors";

const app: Application = express();
app.use(express.json());

app.use("/movies", router);

app.use(handleError);

export default app;

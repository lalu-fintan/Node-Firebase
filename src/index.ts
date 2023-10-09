import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import connectDB from "./config/dbConfig";
import mainRouter from "./router/mainRouter";
import mainConfig from "./config/mainConfig";
dotenv.config();

const app: Application = express();
const port = process.env.PORT;

mainConfig(app);
connectDB();
mainRouter(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

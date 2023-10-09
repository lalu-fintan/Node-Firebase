import { Router } from "express";
import authRouter from "./authRouter";

const router = Router();

const mainRouter = (app: any) => {
  app.use("/api/auth", authRouter);
};

export default mainRouter;

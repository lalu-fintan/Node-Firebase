import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const mainConfig = (app: any) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
};

export default mainConfig;

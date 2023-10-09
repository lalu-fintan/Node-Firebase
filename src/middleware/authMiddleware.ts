import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase/firebase-auth";

interface customRequest extends Request {
  user: any;
}

export const authrization = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = admin.auth().verifyIdToken(token || "");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

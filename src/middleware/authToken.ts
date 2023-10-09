import jwt from "jsonwebtoken";

type User = {
  id: number;
  userName: string;
  email: string;
  role: string;
};

export const generateAccessToken = (user: object): string => {
  return jwt.sign({ user }, process.env.SECRET_KEY || "", { expiresIn: "1d" });
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET_KEY || "", { expiresIn: "3d" });
};

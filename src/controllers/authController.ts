import admin from "../config/firebase/firebase-auth";
import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/authToken";

export const uploadLogo = (req: Request, res: Response) => {
  const file = req.file;
  try {
    if (!file) {
      throw new Error("image not provided");
    } else {
      const bucket = admin.storage().bucket();
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on("error", (err) => {
        console.log(err);
        res.status(500).json("file uploaded failed");
      });
      stream.on("finish", async () => {
        const [url] = await fileUpload.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });

        res.status(200).json({ message: "file uploaded successfully", url });
      });

      stream.end(file.buffer);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  try {
    const verifyUser = await authModel.findOne({ userName });
    const verifyEmail = await authModel.findOne({ email });
    if (verifyUser) {
      return res.status(400).json({ message: "userName already exist" });
    } else if (verifyEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new authModel({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();
    const refreshToken = generateRefreshToken(user.id);
    const accessToken = generateAccessToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "account created successfully", token: accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "email is not valid" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user.id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "login Successfull", accessToken });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logOut = async (req: Request, res: Response) => {
  const cookie = req.cookies;

  try {
    if (cookie.refreshToken) {
      res.clearCookie("refreshToken", { httpOnly: true, secure: false });
      res.status(200).json({ message: "logout successfully" });
    } else {
      res.status(400).json({ message: "cookie is not avilable" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

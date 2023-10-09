"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.signIn = exports.signUp = exports.uploadLogo = void 0;
const firebase_auth_1 = __importDefault(require("../config/firebase/firebase-auth"));
const authModel_1 = __importDefault(require("../model/authModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authToken_1 = require("../middleware/authToken");
const uploadLogo = (req, res) => {
    const file = req.file;
    try {
        if (!file) {
            throw new Error("image not provided");
        }
        else {
            const bucket = firebase_auth_1.default.storage().bucket();
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
            stream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
                const [url] = yield fileUpload.getSignedUrl({
                    action: "read",
                    expires: "03-01-2500",
                });
                res.status(200).json({ message: "file uploaded successfully", url });
            }));
            stream.end(file.buffer);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.uploadLogo = uploadLogo;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const verifyUser = yield authModel_1.default.findOne({ userName });
        const verifyEmail = yield authModel_1.default.findOne({ email });
        if (verifyUser) {
            return res.status(400).json({ message: "userName already exist" });
        }
        else if (verifyEmail) {
            return res.status(400).json({ message: "Email already exist" });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new authModel_1.default({
            userName,
            email,
            password: hashPassword,
        });
        yield user.save();
        const refreshToken = (0, authToken_1.generateRefreshToken)(user.id);
        const accessToken = (0, authToken_1.generateAccessToken)(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res
            .status(200)
            .json({ message: "account created successfully", token: accessToken });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield authModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "email is not valid" });
        }
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            const accessToken = (0, authToken_1.generateAccessToken)(user);
            const refreshToken = (0, authToken_1.generateRefreshToken)(user.id);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            });
            res.status(200).json({ message: "login Successfull", accessToken });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.signIn = signIn;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    try {
        if (cookie.refreshToken) {
            res.clearCookie("refreshToken", { httpOnly: true, secure: false });
            res.status(200).json({ message: "logout successfully" });
        }
        else {
            res.status(400).json({ message: "cookie is not avilable" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.logOut = logOut;
//# sourceMappingURL=authController.js.map
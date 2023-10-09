"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, process.env.SECRET_KEY || "", { expiresIn: "1d" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY || "", { expiresIn: "3d" });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=authToken.js.map
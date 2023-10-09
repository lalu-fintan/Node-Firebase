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
exports.imageToUploadOnFireBase = void 0;
const firebase_auth_1 = __importDefault(require("../config/firebase/firebase-auth"));
const imageToUploadOnFireBase = (imageData, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucket = firebase_auth_1.default.storage().bucket();
        const file = bucket.file(fileName);
        yield file.save(imageData);
        const signurl = yield file.getSignedUrl({
            action: "read",
            expires: "03-12-2495",
        });
        return signurl[0];
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.imageToUploadOnFireBase = imageToUploadOnFireBase;
//# sourceMappingURL=firebase_imgURL.js.map
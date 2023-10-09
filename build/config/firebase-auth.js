"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firesbase_service_json_1 = __importDefault(require("../firesbase-service.json"));
const account = firesbase_service_json_1.default;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(account),
});
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase-auth.js.map
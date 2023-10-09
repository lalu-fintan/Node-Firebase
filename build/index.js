"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
const mainConfig_1 = __importDefault(require("./config/mainConfig"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, mainConfig_1.default)(app);
(0, dbConfig_1.default)();
(0, mainRouter_1.default)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map
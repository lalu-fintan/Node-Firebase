"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageUpload_1 = require("../middleware/imageUpload");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/upload", imageUpload_1.upload.single("image"), authController_1.uploadLogo);
router.post("/signup", authController_1.signUp);
router.post("/signin", authController_1.signIn);
router.get("/logout", authController_1.logOut);
exports.default = router;
//# sourceMappingURL=authRouter.js.map
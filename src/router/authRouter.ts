import { Router } from "express";
import { upload } from "../middleware/imageUpload";
import {
  logOut,
  signIn,
  signUp,
  uploadLogo,
} from "../controllers/authController";

const router = Router();

router.post("/upload", upload.single("image"), uploadLogo);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logOut);

export default router;

import express from "express";
const router = express.Router();
import {
  login,
  createUser,
  sendOTP,
  verifyUser,
  editUser,
} from "../controllers/User.controller";
import upload from "../middlewares/multer";

import { authenticateUser } from "../middlewares/auth";

router.post("/login", login);
router.post("/signup", upload.single("profilePic"), createUser);
router.post("/verify_user", verifyUser);
router.post("/send_otp", sendOTP);
router.patch(
  "/edit-user",
  upload.single("profilePic"),
  authenticateUser,
  editUser
);

export default router;

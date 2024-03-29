import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserDetails,
} from "../controllers/authController.js";

import authenticateUser from "../middleware/auth.js";
// import { registerUser } from "../controllers/testAuthController.js";
import express from "express";
const router = express.Router();

router.route("/register").post(apiLimiter, registerUser);
router.route("/login").post(apiLimiter, loginUser);
router.route("/logout").get(logoutUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/getUserDetails").get(authenticateUser, getUserDetails);

export default router;

import express from "express";
import { signUp, login, refreshToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

export default router;

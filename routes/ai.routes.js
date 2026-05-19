import express from "express";

import { summarize } from "../controllers/ai.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Unprotected test route for debugging routing/auth issues
router.post("/summarize-noauth", summarize);

router.post("/summarize", authMiddleware, summarize);

export default router;

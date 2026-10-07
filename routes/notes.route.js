import express from "express";

import { createNote, getNotes, updateNote, deleteNote } from "../controllers/notes.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/search", authMiddleware, semanticSearch);

export default router;

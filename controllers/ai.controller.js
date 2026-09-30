import mongoose from "mongoose";
import { summarizeNote } from "../services/ai.service.js";
import { saveSummarizedNotes } from "../services/notes.service.js";

export const summarize = async (req, res) => {
	try {
		const { content, noteId } = req.body;

		if (typeof content !== "string" || !content.trim()) {
			return res.status(400).json({
				success: false,
				message: "Content must be a non-empty string",
			});
		}

		if (!mongoose.Types.ObjectId.isValid(noteId)) {
			return res.status(400).json({
				success: false,
				message: "A valid noteId is required",
			});
		}

		const summary = await summarizeNote(content);
		const note = await saveSummarizedNotes({
			noteId,
			summarizedNotes: summary,
			userId: req.user.userId,
		});

		if (!note) {
			return res.status(404).json({
				success: false,
				message: "Note not found",
			});
		}

		res.json({
			success: true,
			summary,
			note,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

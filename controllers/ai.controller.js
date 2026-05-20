import { summarizeNote } from "../services/ai.service.js";

export const summarize = async (req, res) => {
	try {
		const { content } = req.body;
		if (!content) {
			return res.status(400).json({ message: "Content is required for summarization." });
		}
		const summary = await summarizeNote(content);
		res.json({ summary });
	} catch (error) {
		console.error("Error summarizing note:", error.message);
		console.error("Full error:", error);
		res.status(500).json({
			message: "Internal server error.",
			error: process.env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
};

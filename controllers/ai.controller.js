import { summarizeNote } from "../services/ai.service.js";

export const summarize = async (req, res) => {
	try {
		console.log("BODY:", req.body);

		const { content } = req.body;

		if (!content) {
			return res.status(400).json({
				message: "Content is required",
			});
		}

		const summary = await summarizeNote(content);

		return res.status(200).json({
			summary,
		});
	} catch (error) {
		console.error("FULL AI ERROR:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
			stack: error.stack,
		});
	}
};

import { summarizeNote } from "../services/ai.service.js";

export const summarize = async (req, res) => {
	try {
		const { content } = req.body;

		if (!content) {
			return res.status(400).json({
				success: false,
				message: "Content is required",
			});
		}

		const summary = await summarizeNote(content);

		res.json({
			success: true,
			summary,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// import { GoogleGenerativeAI } from "@google/generative-ai";

// if (!process.env.GEMINI_API_KEY) {
// 	console.error("❌ GEMINI_API_KEY not set in environment variables!");
// }

// console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
// 	model: "gemini-2.0-flash",
// });

// export const summarizeNote = async (content) => {
// 	try {
// 		const prompt = `
//       You are a helpful assistant that summarizes notes.

//       Summarize the following note:

//       ${content}
//     `;

// 		const result = await model.generateContent(prompt);

// 		return result.response.text();
// 	} catch (error) {
// 		console.log("Gemini Error:", error);
// 		throw error;
// 	}
// };

import { model } from "../config/ai.config.js";

export const summarizeNote = async (content) => {
	const response = await model.invoke([
		{
			role: "system",
			content: "You are an AI assistant that summarizes notes clearly and concisely.",
		},
		{
			role: "user",
			content: `Summarize this note:\n\n${content}`,
		},
	]);

	return response.content;
};

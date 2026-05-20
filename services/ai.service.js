import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

export const summarizeNote = async (content) => {
	try {
		const prompt = `
      You are a helpful assistant that summarizes notes.

      Summarize the following note:

      ${content}
    `;

		const result = await model.generateContent(prompt);

		return result.response.text();
	} catch (error) {
		console.log("Gemini Error:", error);
		throw error;
	}
};

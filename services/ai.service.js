import { GoogleGenerativeAI } from "@google/generative-ai";

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

		const response = await result.response;

		return response.text();
	} catch (error) {
		console.log("Gemini Error:", error);
		throw error;
	}
};

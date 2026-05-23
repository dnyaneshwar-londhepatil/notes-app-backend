import { ChatOpenAI } from "@langchain/openai";

export const model = new ChatOpenAI({
	model: "google/gemini-2.0-flash-exp:free",

	apiKey: process.env.OPENROUTER_API_KEY,

	configuration: {
		baseURL: "https://openrouter.ai/api/v1",
	},

	temperature: 0.3,
});

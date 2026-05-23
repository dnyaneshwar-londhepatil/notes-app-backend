import { ChatOpenAI } from "@langchain/openai";

export const model = new ChatOpenAI({
	apiKey: process.env.OPENROUTER_API_KEY,

	model: "mistralai/mistral-7b-instruct:free",

	configuration: {
		baseURL: "https://openrouter.ai/api/v1",
	},

	temperature: 0.3,
});

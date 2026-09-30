import { ChatOpenAI } from "@langchain/openai";

export const model = new ChatOpenAI({
	apiKey: process.env.OPENROUTER_API_KEY,

	model: "nvidia/nemotron-3-super-120b-a12b:free",

	configuration: {
		baseURL: "https://openrouter.ai/api/v1",
	},

	temperature: 0.3,
});

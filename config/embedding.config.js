import { OpenAIEmbeddings } from "@langchain/openai";

export const embedding = new OpenAIEmbeddings({
    apiKey: process.env.OPENROUTER_API_KEY,
     model: "nvidia/nemotron-3-embed-1b:free",


    configuration: {
		baseURL: "https://openrouter.ai/api/v1",
	},

});

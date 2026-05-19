import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
	model: "gpt-4.1-mini",
	temperature: 0.7,
	apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeNote = async (content) => {
	const response = await model.invoke([
		{
			role: "system",
			content: "You are a helpful assistant that summarizes notes.",
		},
		{
			role: "user",
			content: `Summarize the following note:\n\n${content}`,
		},
	]);
	return response.content;
};

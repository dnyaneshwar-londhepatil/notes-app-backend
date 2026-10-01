import { embedding } from "../config/embedding.config.js";


export const generateEmbedding = async (text) => {
	const result = await embedding.embedQuery(text);
	return result;
};

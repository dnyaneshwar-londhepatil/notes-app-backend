import dotenv from "dotenv";

dotenv.config();

const { generateEmbedding } = await import("./services/embedding.service.js");

const test = async () => {
	try {
		const text = "JWT authentication uses access and refresh tokens.";

		const embedding = await generateEmbedding(text);

		console.log("Embedding generated successfully!");
		console.log("Dimensions:", embedding.length);
		console.log("First 10 values:", embedding.slice(0, 10));
	} catch (error) {
		console.error("Embedding error:", error.message);
	}
};

test();
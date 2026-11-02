import "dotenv/config";
import mongoose from "mongoose";
import { chatWithNotes } from "./services/rag.service.js";

const testRAG = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    // 2. Use an existing user ID from your database
    const userId = new mongoose.Types.ObjectId(
      "69fab13788df49b041a65e1d"
    );

    // 3. Ask a question about your saved notes
    const question = "What is an Embedding?";

    console.log("Question:", question);

    // 4. Execute the RAG service
    const result = await chatWithNotes({
      question,
      userId,
    });

    // 5. Display the response
    console.log("\nAI Answer:");
    console.log(result.answer);

    console.log("\nRetrieved Sources:");
    console.log(JSON.stringify(result.sources, null, 2));
  } catch (error) {
    console.error("RAG Test Failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

testRAG();
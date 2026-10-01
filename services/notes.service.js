import { Note } from "../models/notes.model.js";
import { generateEmbedding } from "./embedding.service.js";

const createNoteWithEmbedding = async ({ title }) => {
	const text = `${title}\n${content || ""}`;
	const embedding = await generateEmbedding(text);
	return embedding;
};

export const createNote = async ({ category, title, content, summarizedNotes, userId }) => {
	const embedding = await createNoteWithEmbedding({ content });
	return await Note.create({
		category,
		title,
		content,
		summarizedNotes,
		userId,
		embedding,
	});
};

export const getNotesByUserId = async (userId) => {
	return await Note.find({ userId }).sort({ createdAt: -1 });
};

export const saveSummarizedNotes = async ({ noteId, summarizedNotes, userId }) => {
	return await Note.findOneAndUpdate(
		{ _id: noteId, userId },
		{ $set: { summarizedNotes } },
		{ new: true },
	);
};

export const updateNoteService = async ({ noteId, category, title, content, summarizedNotes, isPinned, userId }) => {
	return await Note.findOneAndUpdate({ _id: noteId, userId }, { category, title, content, summarizedNotes, isPinned }, { new: true });
};

export const deleteNoteService = async ({ noteId, userId }) => {
	return await Note.findOneAndDelete({ _id: noteId, userId });
};

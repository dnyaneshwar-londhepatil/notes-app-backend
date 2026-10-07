import mongoose from "mongoose";

import { Note } from "../models/notes.model.js";
import { generateEmbedding } from "./embedding.service.js";

const createNoteWithEmbedding = async ({ title, content }) => {
	const text = `${title}\n${content || ""}`;
	const embedding = await generateEmbedding(text);
	return embedding;
};

export const createNoteService = async ({ category, title, content, summarizedNotes, userId }) => {
	const embedding = await createNoteWithEmbedding({ title, content });
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


export const semanticSearchNotes = async ({ query, userId }) => {
	const queryEmbedding = await generateEmbedding(query);
	const normalizedUserId = mongoose.Types.ObjectId.isValid(userId)
		? new mongoose.Types.ObjectId(userId)
		: userId;

	const notes = await Note.aggregate([
		{
			$vectorSearch: {
				index: "vector_index",
				path: "embedding",
				queryVector: queryEmbedding,
				numCandidates: 100,
				limit: 10,
			},
		},
		{
			$match: {
				userId: normalizedUserId,
			},
		},
		{
			$project: {
				_id: 1,
				title: 1,
				content: 1,
				category: 1,
				isPinned: 1,
				createdAt: 1,
				score: {
					$meta: "vectorSearchScore",
				},
			},
		},
	]);

	return notes;
};

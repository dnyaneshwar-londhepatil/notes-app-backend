import { Note } from "../models/notes.model.js";

export const createNoteService = async ({ category, title, content, summarizedNotes, userId }) => {
	return await Note.create({
		category,
		title,
		content,
		summarizedNotes,
		userId,
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

import { Note } from "../models/notes.model.js";

export const createNoteService = async ({ category, title, content, userId }) => {
	return await Note.create({
		category,
		title,
		content,
		userId,
	});
};

export const getNotesByUserId = async (userId) => {
	return await Note.find({ userId }).sort({ createdAt: -1 });
};

export const updateNoteService = async ({ noteId, category, title, content, isPinned, userId }) => {
	return await Note.findOneAndUpdate({ _id: noteId, userId }, { category, title, content, isPinned }, { new: true });
};

export const deleteNoteService = async ({ noteId, userId }) => {
	return await Note.findOneAndDelete({ _id: noteId, userId });
};

import { createNoteService, deleteNoteService, getNotesByUserId, updateNoteService } from "../services/notes.service.js";

export const createNote = async (req, res) => {
	try {
		const note = await createNoteService({ ...req.body, userId: req.user.userId });
		res.status(201).json(note);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getNotes = async (req, res) => {
	try {
		const notes = await getNotesByUserId(req.user.userId);
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateNote = async (req, res) => {
	try {
		const updatedNote = await updateNoteService({
			noteId: req.params.id,
			...req.body,
			userId: req.user.userId,
		});
		if (!updatedNote) {
			return res.status(404).json({ message: "Note not found" });
		}
		res.status(200).json(updatedNote);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteNote = async (req, res) => {
	try {
		const deleted = await deleteNoteService({ noteId: req.params.id, userId: req.user.userId });
		if (!deleted) {
			return res.status(404).json({ message: "Note not found" });
		}
		res.status(200).json({ message: "Note deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

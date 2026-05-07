import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
	{
		category: { type: String, required: true },
		title: { type: String, required: true },
		content: { type: String, required: false },
		isPinned: { type: Boolean, default: false },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true },
);

export const Note = mongoose.model("Note", noteSchema);

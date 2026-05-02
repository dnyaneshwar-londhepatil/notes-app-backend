import { registerUser, loginUser, refreshAccessToken } from "../services/auth.service.js";

export const signUp = async (req, res) => {
	try {
		const user = await registerUser(req.body);

		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const data = await loginUser(req.body);
		res.status(200).json({ message: "Login successful", ...data });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const { refreshToken } = req.body;
		const data = await refreshAccessToken({ refreshToken });
		res.status(200).json({ message: "Token refreshed successfully", ...data });
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};

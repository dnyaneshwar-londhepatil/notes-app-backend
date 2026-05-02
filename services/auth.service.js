import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import validator from "validator";

const SALT_ROUNDS = 10;

export const registerUser = async ({ userName, email, password }) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error("Email already in use");
	}

	if (!validator.isEmail(email)) {
		throw new Error("Invalid email format");
	}

	if (password.length < 8) {
		throw new Error("Password must be at least 8 characters long");
	}

	const passwordStrength = validator.isStrongPassword(password, {
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	});

	if (!passwordStrength) {
		throw new Error("Password must include uppercase, lowercase, number, and symbol");
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	const user = new User({
		userName,
		email,
		password: hashedPassword,
	});

	await user.save();
	return user;
};

export const loginUser = async ({ email, password }) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Invalid email or password");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Invalid email or password");
	}

	const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

	const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

	return { accessToken, refreshToken, user };
};

export const refreshAccessToken = async (refreshToken) => {
	if (!refreshToken) {
		throw new Error("Refresh token is required");
	}

	try {
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
		const user = await User.findById(decoded.userId);

		if (!user) {
			throw new Error("User not found");
		}

		const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

		return { accessToken: newAccessToken };
	} catch (error) {
		throw new Error("Invalid refresh token");
	}
};

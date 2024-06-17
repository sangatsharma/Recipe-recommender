import { Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET } from "@/utils/config";
import { RegisterForm, UserDataDB } from "../users.types";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { userSchema } from "../users.models";

import bcrypt from "bcrypt";

// SET AUTH COOKIE
export const handleToken = (userData: UserDataDB, res: Response) => {
	const jwtToken = {
		id: userData.id,
		name: userData.name,
		email: userData.email,
	};

	// Sign token
	const token = jwt.sign(jwtToken, SECRET);

	// Set cookie
	res.cookie("token", token, {
		maxAge: (1000 * 60 * 60 * 24 * 7),
	});

	// Return user details
	return ({
		"success": true,
		"body": {
			"name": userData.name,
			"email": userData.email,
			"followers": userData.followers,
			"following": userData.following,
		}
	});
};

export const userRegisterHelper = async (body: RegisterForm) => {
	if (body?.password) {
		const saltRound = 10;

		// Hash password
		const passwordHash = await bcrypt.hash(body.password, saltRound);

		// Store hashed password
		body["password"] = passwordHash;
	}

	// Save user
	// const checkUserExists = await userExists(body.email);
	// if (!checkUserExists.success) {
	const userData: UserDataDB = (await db.insert(userSchema).values(body).returning())[0];
	return { success: true, body: userData };
	// }
	// else {
	// 	return {
	// 		success: false, body: {
	// 			message: "User with provided email already exists",
	// 		}
	// 	};
	// }

};


export const userExists = async (email: string) => {
	// Check for user with given email
	const userTmp = await (db.select().from(userSchema).where(eq(userSchema.email, email)));

	// Return resposne
	const res = {
		success: userTmp.length !== 0,
		body: userTmp[0] || "",
	};

	return res;
};
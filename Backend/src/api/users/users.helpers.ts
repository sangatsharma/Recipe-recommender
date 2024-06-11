import { Response } from "express";
import jwt from "jsonwebtoken";

import { SECRET } from "@/utils/config";
import { UserData } from "./users.types";

// SET AUTH COOKIE
export const handleToken = (userData: UserData, res: Response) => {
	const jwtToken = {
		id: userData.id,
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
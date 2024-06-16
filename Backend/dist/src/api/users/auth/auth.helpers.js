"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExists = exports.userRegisterHelper = exports.handleToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../utils/config");
const db_1 = require("../../../utils/db");
const drizzle_orm_1 = require("drizzle-orm");
const users_models_1 = require("../users.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
// SET AUTH COOKIE
const handleToken = (userData, res) => {
    const jwtToken = {
        id: userData.id,
        email: userData.email,
    };
    // Sign token
    const token = jsonwebtoken_1.default.sign(jwtToken, config_1.SECRET);
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
exports.handleToken = handleToken;
const userRegisterHelper = async (body) => {
    if (body.password) {
        const saltRound = 10;
        // Hash password
        const passwordHash = await bcrypt_1.default.hash(body.password, saltRound);
        // Store hashed password
        body["password"] = passwordHash;
    }
    // Save user
    const checkUserExists = await (0, exports.userExists)(body.email);
    if (!checkUserExists.success) {
        const userData = (await db_1.db.insert(users_models_1.userSchema).values(body).returning())[0];
        return { success: true, body: userData };
    }
    else {
        return {
            success: false, body: {
                message: "User with provided email already exists",
            }
        };
    }
};
exports.userRegisterHelper = userRegisterHelper;
const userExists = async (email) => {
    // Check for user with given email
    const userTmp = await (db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, email)));
    // Return resposne
    const res = {
        success: userTmp.length !== 0,
        body: userTmp[0] || "",
    };
    return res;
};
exports.userExists = userExists;

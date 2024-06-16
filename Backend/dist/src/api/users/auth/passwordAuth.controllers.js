"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginHandler = exports.userRegisterHandler = void 0;
const auth_helpers_1 = require("./auth.helpers");
const auth_helpers_2 = require("./auth.helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRegisterHandler = async (req, res, next) => {
    // Get credentails
    const body = req.body;
    // Email and Password are required
    //TODO: Check for all required fields
    if (!body.email || !body.password || !body.name) {
        return res.json({
            "success": false,
            "body": {
                "message": "Empty fields",
            },
        });
    }
    try {
        // Register user
        const userData = await (0, auth_helpers_1.userRegisterHelper)(body);
        if (!userData.success) {
            return res.json(userData);
        }
        // Generate token
        const userRes = (0, auth_helpers_1.handleToken)(userData.body, res);
        return res.json(userRes);
    }
    catch (err) {
        next(err);
    }
};
exports.userRegisterHandler = userRegisterHandler;
/*
  LOGIN USER
*/
const userLoginHandler = async (req, res, next) => {
    const body = req.body;
    // Email and Password are required
    if (!body.email || !body.password) {
        return res.json({
            "success": false,
            "body": {
                "message": "All fields are required",
            },
        });
    }
    try {
        // Check if user exists or not
        // const userTmp = (await db.select().from(userSchema).where(eq(userSchema.email, body.email)));
        const userTmp = await (0, auth_helpers_2.userExists)(body.email);
        if (!userTmp.success) {
            return res.json({
                "success": false,
                "body": {
                    "message": "User with this email dosen't exist",
                },
            });
        }
        const userData = userTmp.body;
        // Compare to validate password
        const passswordCorrect = await bcrypt_1.default.compare(body.password, userData.password);
        if (!passswordCorrect) {
            return res.json({
                "success": false,
                "body": {
                    "message": "Incorrect password",
                },
            });
        }
        // Generate token, save as cookie
        const userToken = (0, auth_helpers_1.handleToken)(userData, res);
        return res.json(userToken);
    }
    catch (e) {
        next(e);
    }
};
exports.userLoginHandler = userLoginHandler;

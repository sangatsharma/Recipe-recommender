"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../utils/config");
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.unknownEndPoint = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const unknownEndPoint = (_, res) => {
    res.status(404).json({
        error: "Unknown Endpoint"
    });
};
exports.unknownEndPoint = unknownEndPoint;
const authenticateJWT = (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie?.auth_token)
        return res.status(401).json({ success: false, body: { message: "Unauthorized" } });
    jsonwebtoken_1.default.verify(cookie.auth_token, config_1.SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ success: false, body: { message: "Forbidden" } });
        next();
    });
};
exports.authenticateJWT = authenticateJWT;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndPoint = void 0;
const unknownEndPoint = (_, res) => {
    res.status(404).json({
        error: "Unknown Endpoint"
    });
};
exports.unknownEndPoint = unknownEndPoint;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const postgres_1 = require("postgres");
const errorHandler = (err, _, res, __) => {
    let message = "Unknown Error";
    console.log(err);
    if (err.message === "No recipients defined") {
        message = "Invalid email format";
    }
    // TODO: Error message based on DB ERROR
    if (err.name === "CastError") {
        message = "Malformatted Id";
    }
    else if (err.name === "ValidationError") {
        message = err.message;
    }
    else if (err instanceof postgres_1.PostgresError) {
        const code = err.code;
        if (code === "23505")
            message = "User with provided email already exists";
    }
    else if (err.name === "Error") {
        if (err.message === "UNDEFINED_VALUE: Undefined values are not allowed") {
            message = "Empty fields not allowed";
        }
    }
    return res.json({
        success: false,
        body: {
            message: message
        }
    });
};
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _, res, next) => {
    // TODO: Error message based on DB ERROR
    if (err.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" });
    }
    else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }
    else if (err.name === "PostgresError") {
        return res.status(400).json({ error: "DB Error" });
    }
    else if (err.name === "Error") {
        if (err.message === "UNDEFINED_VALUE: Undefined values are not allowed") {
            return res.status(400).json({ error: "Empty fields not allowed" });
        }
        else {
            return res.status(400).json({ err: "SMTH" });
        }
    }
    else {
        return res.status(400).json({ error: "Something went wrong" });
    }
};
exports.errorHandler = errorHandler;

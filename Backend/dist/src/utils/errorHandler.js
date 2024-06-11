"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _, res) => {
    console.log(err);
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
    else {
        return res.status(400).json({ error: "Something went wrong" });
    }
};
exports.errorHandler = errorHandler;

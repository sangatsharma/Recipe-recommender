import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {

  // TODO: Error message based on DB ERROR
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "PostgresError") {
    return res.status(200).json({ error: "DB Error" });
  } else if (err.name === "Error") {
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
import { NextFunction, Request, Response } from "express";
import { PostgresError } from "postgres";

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  let message = "Unknown Error";

  // TODO: Error message based on DB ERROR
  if (err.name === "CastError") {
    message = "Malformatted Id";
  }

  else if (err.name === "ValidationError") {
    message = err.message;
  }

  else if (err instanceof PostgresError) {
    const code = err.code;

    if (code === "23505") message = "User with provided email already exists";
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
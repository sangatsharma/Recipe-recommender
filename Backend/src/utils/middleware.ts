import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, _: Request, res: Response, next: NextFunction) => {
  console.log(err);

  // TODO: Error message based on DB ERROR
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "PostgresError") {
    return res.status(400).json({ error: "DB Error" });
  }
  else {
    return res.status(400).json({ error: "Something went wrong" });
  }

  next(err);
};

export const unknownEndPoint = (_: Request, res: Response) => {
  res.status(404).send({
    error: "Unknown Endpoint"
  });
};
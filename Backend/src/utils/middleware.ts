import { Request, Response } from "express";

export const unknownEndPoint = (_: Request, res: Response) => {
  res.status(404).json({
    error: "Unknown Endpoint"
  });
};
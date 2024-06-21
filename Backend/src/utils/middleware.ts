import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "./config";

export const unknownEndPoint = (_: Request, res: Response) => {
  res.status(404).json({
    error: "Unknown Endpoint"
  });
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies;
  if (cookie?.token) cookie.auth_token = cookie.token as string;

  if (!cookie?.auth_token)
    return res.status(401).json({ success: false, body: { message: "Unauthorized" } });

  jwt.verify(cookie.auth_token as string, SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, body: { message: "Forbidden" } });
    res.locals.user = user;
    next();
  });
};
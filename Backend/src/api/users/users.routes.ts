/*
  ROUTES REGARDING USERS.
  ENDPOINTS:
    -> "/register" with POST         = register new user
    -> "/login" with POST            = login user
    -> "/follow" with POST           = follow a user
*/
import express, { RequestHandler } from "express";

// Types
import { userLoginHandler, userRegisterHandler } from "./auth/passwordAuth.controllers";
import { oAuth2Server, oAuthHandler } from "./auth/googleAuth.controllers";
import { followUser, tmpDemo } from "./users.controllers";

const userRouter = express.Router();

// AUTH
userRouter.post("/auth/register", userRegisterHandler as RequestHandler);
userRouter.post("/auth/login", userLoginHandler as RequestHandler);
userRouter.get("/auth/oauth", oAuthHandler as RequestHandler);
userRouter.get("/auth/osuccess", oAuth2Server as RequestHandler);

userRouter.post("/follow", followUser as RequestHandler);
userRouter.get("/recipes", tmpDemo);

export default userRouter;
/*
  ROUTES REGARDING USERS.
  ENDPOINTS:
    -> "/register" with POST         = register new user
    -> "/login" with POST            = login user
    -> "/follow" with POST           = follow a user
*/
import express, { RequestHandler } from "express";

// Types
import { changePasswordHandler, logoutHandler, userLoginHandler, userRegisterHandler, verifyEmailHandler } from "./auth/passwordAuth.controllers";
import { oAuth2Server, oAuthHandler } from "./auth/googleAuth.controllers";
import { followUser, tmpDemo, userInfoHandler, validateToken } from "./users.controllers";
import { authenticateJWT } from "@/utils/middleware";

const userRouter = express.Router();

// AUTH
userRouter.post("/auth/register", userRegisterHandler as RequestHandler);
userRouter.post("/auth/login", userLoginHandler as RequestHandler);
userRouter.get("/auth/oauth", oAuthHandler as RequestHandler);
userRouter.get("/auth/osuccess", oAuth2Server as RequestHandler);
userRouter.post("/auth/password-reset", authenticateJWT, changePasswordHandler as RequestHandler);
userRouter.get("/auth/verify/:jwt", verifyEmailHandler as RequestHandler);
userRouter.post("/auth/logout", authenticateJWT, logoutHandler);

userRouter.get("/", authenticateJWT, userInfoHandler as RequestHandler);
userRouter.post("/follow", authenticateJWT, followUser as RequestHandler);
userRouter.get("/recipes", authenticateJWT, tmpDemo);
userRouter.get("/validate", authenticateJWT, validateToken);

export default userRouter;
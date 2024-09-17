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
import { favouriteRecipeHandler, followUser, getUserPreferences, notificationCont, recipeFavouriteGetHandler, tmpDemo, updateUserInfo, updateUserPreferences, userInfoHandler, userProfile, validateToken } from "./users.controllers";
import { authenticateJWT } from "@/utils/middleware";

import multer from "multer";

const userRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// AUTH
userRouter.post("/auth/register", upload.single("profile_pic"), userRegisterHandler as RequestHandler);
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
userRouter.post("/favourite", authenticateJWT, favouriteRecipeHandler as RequestHandler);
userRouter.get("/favourite", authenticateJWT, recipeFavouriteGetHandler as RequestHandler);
userRouter.post("/update", upload.single("profile_pic"), authenticateJWT, updateUserInfo as RequestHandler);

userRouter.get("/notifications", authenticateJWT, notificationCont as RequestHandler);

userRouter.post("/pref", authenticateJWT, updateUserPreferences as RequestHandler);
userRouter.get("/pref", authenticateJWT, getUserPreferences as RequestHandler);

userRouter.get("/profile/:id", userProfile as RequestHandler);

export default userRouter;
/*
  ROUTES REGARDING USERS.
  ENDPOINTS:
    -> "/register" with POST         = register new user
    -> "/login" with POST            = login user
    -> "/follow" with POST           = follow a user
*/
import express from "express";

// Types
import { followUser, tmpDemo, userLoginHandler, userRegisterHandler } from "./users.controllers";

const userRouter = express.Router();

userRouter.post("/register", userRegisterHandler);
userRouter.post("/login", userLoginHandler);
userRouter.post("/follow", followUser);
userRouter.get("/recipes", tmpDemo);

export default userRouter;
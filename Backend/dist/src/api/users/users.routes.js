"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  ROUTES REGARDING USERS.
  ENDPOINTS:
    -> "/register" with POST         = register new user
    -> "/login" with POST            = login user
    -> "/follow" with POST           = follow a user
*/
const express_1 = __importDefault(require("express"));
// Types
const passwordAuth_controllers_1 = require("./auth/passwordAuth.controllers");
const googleAuth_controllers_1 = require("./auth/googleAuth.controllers");
const users_controllers_1 = require("./users.controllers");
const userRouter = express_1.default.Router();
// AUTH
userRouter.post("/auth/register", passwordAuth_controllers_1.userRegisterHandler);
userRouter.post("/auth/login", passwordAuth_controllers_1.userLoginHandler);
userRouter.get("/auth/oauth", googleAuth_controllers_1.oAuthHandler);
userRouter.get("/auth/osuccess", googleAuth_controllers_1.oAuth2Server);
userRouter.post("/auth/password-reset", passwordAuth_controllers_1.changePasswordHandler);
userRouter.get("/auth/verify/:jwt", passwordAuth_controllers_1.verifyEmailHandler);
userRouter.post("/follow", users_controllers_1.followUser);
userRouter.get("/recipes", users_controllers_1.tmpDemo);
userRouter.get("/validate", users_controllers_1.validateToken);
exports.default = userRouter;

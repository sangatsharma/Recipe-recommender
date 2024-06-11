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
const users_controllers_1 = require("./users.controllers");
const userRouter = express_1.default.Router();
userRouter.post("/register", users_controllers_1.userRegisterHandler);
userRouter.post("/login", users_controllers_1.userLoginHandler);
userRouter.post("/follow", users_controllers_1.followUser);
userRouter.get("/recipes", users_controllers_1.tmpDemo);
exports.default = userRouter;

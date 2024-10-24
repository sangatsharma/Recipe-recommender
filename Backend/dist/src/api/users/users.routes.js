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
const middleware_1 = require("../../utils/middleware");
const multer_1 = __importDefault(require("multer"));
const userRouter = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// AUTH
userRouter.post("/auth/register", upload.single("profile_pic"), passwordAuth_controllers_1.userRegisterHandler);
userRouter.post("/auth/login", passwordAuth_controllers_1.userLoginHandler);
userRouter.get("/auth/oauth", googleAuth_controllers_1.oAuthHandler);
userRouter.get("/auth/osuccess", googleAuth_controllers_1.oAuth2Server);
userRouter.post("/auth/password-reset", middleware_1.authenticateJWT, passwordAuth_controllers_1.changePasswordHandler);
userRouter.get("/auth/verify/:jwt", passwordAuth_controllers_1.verifyEmailHandler);
userRouter.post("/auth/logout", middleware_1.authenticateJWT, passwordAuth_controllers_1.logoutHandler);
userRouter.get("/", middleware_1.authenticateJWT, users_controllers_1.userInfoHandler);
userRouter.post("/follow", middleware_1.authenticateJWT, users_controllers_1.followUser);
userRouter.get("/recipes", middleware_1.authenticateJWT, users_controllers_1.tmpDemo);
userRouter.get("/validate", middleware_1.authenticateJWT, users_controllers_1.validateToken);
userRouter.post("/favourite", middleware_1.authenticateJWT, users_controllers_1.favouriteRecipeHandler);
userRouter.get("/favourite", middleware_1.authenticateJWT, users_controllers_1.recipeFavouriteGetHandler);
userRouter.post("/update", upload.single("profile_pic"), middleware_1.authenticateJWT, users_controllers_1.updateUserInfo);
userRouter.get("/notifications", middleware_1.authenticateJWT, users_controllers_1.notificationCont);
userRouter.post("/pref", middleware_1.authenticateJWT, users_controllers_1.updateUserPreferences);
userRouter.get("/pref", middleware_1.authenticateJWT, users_controllers_1.getUserPreferences);
userRouter.get("/profile/:id", users_controllers_1.userProfile);
exports.default = userRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpDemo = exports.followUser = void 0;
// JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../utils/config");
// DB
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../utils/db");
const recipes_models_1 = require("../../api/recipes/recipes.models");
const users_models_1 = require("../../api/users/users.models");
const auth_helpers_1 = require("./auth/auth.helpers");
/****************
* ROUTES
****************/
/*
  FOLLOW USER
*/
const followUser = async (req, res, _) => {
    // TODO: TRY-CATCH
    //TODO: CHECK IF ALREADY FOLLOWING
    const data = req.body;
    const cookie = req.cookies;
    const userToken = jsonwebtoken_1.default.verify(cookie.token, config_1.SECRET);
    // Make sure user with email exists
    const followedUserTmp = await (0, auth_helpers_1.userExists)(data.email);
    const currentUser = await (0, auth_helpers_1.userExists)(userToken.email);
    if (!followedUserTmp.success) {
        // User dosen't exist
        const jsonResponse = {
            "success": false,
            body: {
                "message": "User dosen't exist",
            }
        };
        return res.json(jsonResponse);
    }
    // Get the user to follow
    const followedUser = followedUserTmp.body;
    if (followedUser.email === currentUser.body.email) {
        const jsonResponse = {
            "success": false,
            body: {
                "message": "Cannot follow yourself",
            }
        };
        return res.json(jsonResponse);
    }
    // Add follower & following
    await db_1.db.insert(users_models_1.followerSchema).values({
        follower: Number(userToken.id),
        followedUser: followedUser.id,
    });
    // Update user's followers
    await db_1.db.update(users_models_1.userSchema).set({
        "followers": followedUser.followers + 1,
    }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, followedUser.id));
    // Update user's following
    // TODO: better implementation
    await db_1.db.update(users_models_1.userSchema).set({
        "following": currentUser.body.following + 1,
    }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, Number(userToken.id)));
    const jsonResponse = {
        success: true,
        body: {
            message: `Successfully followed ${followedUser.name}`
        }
    };
    return res.json(jsonResponse);
};
exports.followUser = followUser;
const tmpDemo = (_, res, next) => {
    const helper = async () => {
        // TODO: Get users ID from token
        const data = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.AuthorId, 1));
        return data;
    };
    helper().then((data) => {
        return res.json({ "length": data.length, "data": data });
    }).catch((err) => {
        next(err);
    });
};
exports.tmpDemo = tmpDemo;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteRecipeHandler = exports.tmpDemo = exports.validateToken = exports.followUser = exports.userInfoHandler = void 0;
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
  GET USER DATA
*/
const userInfoHandler = async (req, res, _) => {
    // Get this data from middleware
    const userJwt = res.locals.user;
    // Check if email exists
    const userTmp = await (0, auth_helpers_1.userExists)(userJwt.email);
    if (!userTmp.success) {
        return res.json({
            success: false,
            body: {
                message: "User with provoded email not found",
            },
        });
    }
    // Remove password and return user data
    userTmp.body.password = null;
    return res.json(userTmp);
};
exports.userInfoHandler = userInfoHandler;
/*
  FOLLOW USER
*/
const followUser = async (req, res, _) => {
    // TODO: TRY-CATCH
    //TODO: CHECK IF ALREADY FOLLOWING
    const data = req.body;
    const cookie = req.cookies;
    const userToken = jsonwebtoken_1.default.verify(cookie.auth_token, config_1.SECRET);
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
// CHECK IF PROVIDED TOKEN IS VALID OR NOT
const validateToken = (req, res, _) => {
    const token = req.cookies;
    if (!token.auth_token) {
        return res.json({
            success: false,
            body: {
                message: "Token not available",
            }
        });
    }
    try {
        jsonwebtoken_1.default.verify(token.auth_token, config_1.SECRET);
        return res.json({
            success: true,
            body: {
                message: "Valid Token",
            }
        });
    }
    catch (err) {
        return res.json({
            success: false,
            body: {
                message: "Invalid Token",
            }
        });
    }
};
exports.validateToken = validateToken;
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
/*
  Add/remove recipes to/from favourite
  USAGE:
  {
    recipeId: 'valid id' as number
  }
*/
const favouriteRecipeHandler = async (req, res, next) => {
    // Get recipeId and cookie info
    // TODO: seperate types
    const body = req.body;
    const userCookie = res.locals.user;
    try {
        // Check if recipeId is valid
        const recipeDB = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, body.recipeId));
        if (recipeDB.length === 0) {
            return res.json({
                success: false,
                body: {
                    message: "Invalid recipe id.",
                }
            });
        }
        // Check if item is aready favourited
        const alreadyFav = await db_1.db.select().from(users_models_1.favouriteRecipes).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(users_models_1.favouriteRecipes.recipeId, body.recipeId), (0, drizzle_orm_1.eq)(users_models_1.favouriteRecipes.userId, userCookie.id)));
        // If no then add
        if (alreadyFav.length === 0) {
            await db_1.db.insert(users_models_1.favouriteRecipes).values({
                userId: userCookie.id,
                recipeId: recipeDB[0].RecipeId,
            });
        }
        // Else, remove
        else {
            await db_1.db.delete(users_models_1.favouriteRecipes).where(((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(users_models_1.favouriteRecipes.recipeId, body.recipeId), (0, drizzle_orm_1.eq)(users_models_1.favouriteRecipes.userId, userCookie.id))));
        }
        // Return response
        return res.json({
            success: true,
            body: {
                message: "Successfully " + (alreadyFav.length !== 0 ? "removed from " : "added to ") + "favourites."
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.favouriteRecipeHandler = favouriteRecipeHandler;

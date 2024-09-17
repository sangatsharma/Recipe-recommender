"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationCont = exports.userProfile = exports.getUserPreferences = exports.updateUserPreferences = exports.updateUserInfo = exports.recipeFavouriteGetHandler = exports.favouriteRecipeHandler = exports.tmpDemo = exports.validateToken = exports.followUser = exports.userInfoHandler = void 0;
// JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../utils/config");
// DB
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../utils/db");
const recipes_models_1 = require("../../api/recipes/recipes.models");
const users_models_1 = require("../../api/users/users.models");
const auth_helpers_1 = require("./auth/auth.helpers");
const cloudinary_1 = require("../../utils/cloudinary");
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
    if (!(data.action === "follow" || data.action === "unfollow")) {
        return res.json({
            success: false,
            body: {
                message: "Invalid action"
            }
        });
    }
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
    // await db.insert(followerSchema).values({
    //   follower: Number(userToken.id),
    //   followedUser: followedUser.id,
    // });
    if (data.action === "follow") {
        await db_1.db.update(users_models_1.userSchema).set({
            following: (0, drizzle_orm_1.sql) `array_append(${users_models_1.userSchema.following}, ${followedUser.id} )`,
        }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, currentUser.body.id));
        await db_1.db.update(users_models_1.userSchema).set({
            followers: (0, drizzle_orm_1.sql) `array_append(${users_models_1.userSchema.followers}, ${currentUser.body.id} )`,
        }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, followedUser.id));
    }
    else if (data.action === "unfollow") {
        await db_1.db.update(users_models_1.userSchema).set({
            following: (0, drizzle_orm_1.sql) `array_remove(${users_models_1.userSchema.following}, ${followedUser.id} )`,
        }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, currentUser.body.id));
        await db_1.db.update(users_models_1.userSchema).set({
            followers: (0, drizzle_orm_1.sql) `array_remove(${users_models_1.userSchema.followers}, ${currentUser.body.id} )`,
        }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, followedUser.id));
    }
    await db_1.db.insert(users_models_1.notificationSchema).values({
        type: data.action,
        by: currentUser.body.id,
        to: followedUser.id,
        name: currentUser.body.name,
    });
    // Update user's followers
    // await db.update(userSchema).set({
    //   "followers": followedUser.followers + 1,
    // }).where(eq(userSchema.id, followedUser.id));
    // Update user's following
    // TODO: better implementation
    // await db.update(userSchema).set({
    //   "following": currentUser.body.following + 1,
    // }).where(eq(userSchema.id, Number(userToken.id)));
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
        // const alreadyFav = await db.select().from(favouriteRecipes).where(and(eq(favouriteRecipes.recipeId, body.recipeId), eq(favouriteRecipes.userId, userCookie.id)));
        const alreadyFav = await db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.arrayOverlaps)(users_models_1.userSchema.favourite, [body.recipeId]));
        // If no then add
        if (alreadyFav.length === 0) {
            // await db.insert(favouriteRecipes).values({
            //   userId: userCookie.id,
            //   recipeId: recipeDB[0].RecipeId,
            // });
            await db_1.db.update(users_models_1.userSchema).set({
                favourite: (0, drizzle_orm_1.sql) `array_append(${users_models_1.userSchema.favourite}, ${body.recipeId} )`,
            }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, userCookie.id));
        }
        // Else, remove
        else {
            // await db.delete(favouriteRecipes).where((and(eq(favouriteRecipes.recipeId, body.recipeId), eq(favouriteRecipes.userId, userCookie.id))));
            await db_1.db.update(users_models_1.userSchema).set({
                favourite: (0, drizzle_orm_1.sql) `array_remove(${users_models_1.userSchema.favourite}, ${body.recipeId})`
            });
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
/*
  Fetch favourite list
*/
const recipeFavouriteGetHandler = async (req, res, next) => {
    // User info from cookie
    const userCookie = res.locals.user;
    try {
        // Fetch all for the user
        const userInfo = await db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, userCookie.id));
        if (userInfo[0].favourite.length === 0) {
            // Return response
            return res.json({
                success: true,
                length: 0,
                body: []
            });
        }
        else {
            const favRec = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.inArray)(recipes_models_1.recipeSchema.RecipeId, userInfo[0].favourite));
            // Return response
            return res.json({
                success: true,
                length: favRec.length,
                body: favRec
            });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.recipeFavouriteGetHandler = recipeFavouriteGetHandler;
/*
  UPDATE USER INFO
  USAGE:
  {
    fullName, username, bio, profile_pic
  }
*/
const updateUserInfo = async (req, res, next) => {
    // Provide body
    const body = req.body;
    const userInfo = res.locals.user;
    const updateData = {};
    // if (body.username) updateData.username = body.username;
    if (body.fullName)
        updateData.name = body.fullName;
    if (body.bio)
        updateData.bio = body.bio;
    if (body.birthday)
        updateData.birthday = body.birthday;
    try {
        // If profile picture provided
        if (req.file) {
            // const b64 = Buffer.from(req.file?.buffer).toString("base64");
            // const dataURI = "data:" + req.file?.mimetype + ";base64," + b64;
            // const cldRes = await handleUpload(dataURI);
            // updateData.profile_pic = cldRes.secure_url;
            const url = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer);
            updateData.profile_pic = url;
        }
        // Update DB
        if (Object.keys(updateData).length !== 0)
            await db_1.db.update(users_models_1.userSchema).set(updateData).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, userInfo.email));
        if (body?.city) {
            await db_1.db.update(users_models_1.userSchema).set({ city: body.city }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, userInfo.email));
            // const cityName = String(body.city);
            // const userEmail = String(userInfo.email);
            // // const query = `UPDATE "users" SET city = '${cityName}' where "email" = '${String(userInfo.email)}'`
            // await db.execute(sql`UPDATE users SET city = '12' where email = '${userEmail}' `);
        }
        return res.json({
            success: true,
            body: {
                message: "Successfully updated profile"
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUserInfo = updateUserInfo;
//DEMO
const updateUserPreferences = async (req, res, next) => {
    // Get user info from cookie
    const cookieInfo = res.locals.user;
    const body = req.body;
    body.userId = cookieInfo.id;
    try {
        const userPrefRes = await db_1.db.update(users_models_1.userPref).set(body).where((0, drizzle_orm_1.eq)(users_models_1.userPref.userId, Number(cookieInfo.id))).returning();
        if (userPrefRes.length === 0) {
            const userPrefRes = await db_1.db.insert(users_models_1.userPref).values(body).returning();
            return res.json({
                success: true,
                body: userPrefRes[0]
            });
        }
        return res.json({
            success: true,
            body: userPrefRes[0]
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUserPreferences = updateUserPreferences;
// Return userPrefs
const getUserPreferences = async (req, res, next) => {
    const cookieInfo = res.locals.user;
    try {
        const userPrefRes = await db_1.db.select().from(users_models_1.userPref).where((0, drizzle_orm_1.eq)(users_models_1.userPref.userId, Number(cookieInfo.id)));
        return res.json({
            success: true,
            body: userPrefRes[0]
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserPreferences = getUserPreferences;
// Return users complete profile
const userProfile = async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        // Check if email exists
        const userTmp = await db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, id));
        if (userTmp.length === 0) {
            return res.json({
                success: false,
                body: {
                    message: "User with provoded email not found",
                },
            });
        }
        const userRes = {
            success: true,
            body: userTmp[0]
        };
        return res.json(userRes);
        // Remove password and return user data
        // return res.json(userTmp);
    }
    catch (err) {
        next(err);
    }
};
exports.userProfile = userProfile;
const notificationCont = async (req, res, next) => {
    try {
        const notifications = await db_1.db.select().from(users_models_1.notificationSchema).where((0, drizzle_orm_1.eq)(users_models_1.notificationSchema.to, Number(res.locals.user.id)));
        return res.json({
            success: true,
            message: {
                body: notifications,
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
exports.notificationCont = notificationCont;

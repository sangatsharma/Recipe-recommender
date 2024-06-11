"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpDemo = exports.followUser = exports.userLoginHandler = exports.userRegisterHandler = void 0;
// JWT
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../utils/config");
// DB
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../utils/db");
const recipes_models_1 = require("../../api/recipes/recipes.models");
const users_models_1 = require("../../api/users/users.models");
const users_helpers_1 = require("./users.helpers");
/****************
* ROUTES
****************/
/*
  REGISTER USER
*/
const userRegisterHandler = (req, res, next) => {
    // Get credentails
    const body = req.body;
    // Initialize followers and following to 0
    body.followers = 0;
    body.following = 0;
    // Email and Password are required
    //TODO: Check for all required fields
    if (!body.email || !body.password || !body.name) {
        return res.json({
            "success": false,
            "body": {
                "message": "Empty fields",
            },
        });
    }
    const helper = async () => {
        const saltRound = 10;
        // Hash password
        const passwordHash = await bcrypt_1.default.hash(body.password, saltRound);
        // Store hashed password
        body["password"] = passwordHash;
        try {
            // Save user
            const userData = (await db_1.db.insert(users_models_1.userSchema).values(body).returning())[0];
            return (0, users_helpers_1.handleToken)(userData, res);
        }
        catch (e) {
            next(e);
        }
    };
    helper().then((body) => {
        return res.json({ "success": body?.success, "body": body?.body });
    }).catch((err) => {
        next(err);
    });
};
exports.userRegisterHandler = userRegisterHandler;
/*
  LOGIN USER
*/
const userLoginHandler = (req, res, next) => {
    const body = req.body;
    // Email and Password are required
    if (!body.email || !body.password) {
        return res.json({
            "success": false,
            "body": {
                "message": "Empty fields",
            },
        });
    }
    const helper = async () => {
        try {
            // Check if user exists or not
            const userTmp = (await db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, body.email)));
            if (userTmp.length === 0) {
                return ({
                    "success": false,
                    "body": {
                        "message": "User with this email dosen't exist",
                    },
                });
            }
            const userData = userTmp[0];
            // Compare to validate password
            const passswordCorrect = await bcrypt_1.default.compare(body.password, userData.password);
            if (!passswordCorrect) {
                return ({
                    "success": false,
                    "body": {
                        "message": "Incorrect email or password",
                    },
                });
            }
            // Generate token, save as cookie
            return (0, users_helpers_1.handleToken)(userData, res);
        }
        catch (e) {
            next(e);
        }
    };
    helper().then((body) => {
        return res.json({ "success": body?.success, "body": body?.body });
    }).catch((err) => {
        next(err);
    });
};
exports.userLoginHandler = userLoginHandler;
/*
  FOLLOW USER
*/
const followUser = (req, res, next) => {
    //TODO: CHECK IF ALREADY FOLLOWING
    const data = req.body;
    const cookie = req.cookies;
    const userToken = jsonwebtoken_1.default.verify(cookie.token, config_1.SECRET);
    const helper = async () => {
        // Make sure user with email exists
        const followedUser = await db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, data.email));
        const currentUser = await db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, userToken.id));
        if (followedUser.length === 0)
            return false;
        // Add follower & following
        await db_1.db.insert(users_models_1.followerSchema).values({
            follower: Number(userToken.id),
            followedUser: followedUser[0].id,
        });
        // Update user's followers
        await db_1.db.update(users_models_1.userSchema).set({
            "followers": followedUser[0].followers + 1,
        }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, followedUser[0].id));
        // Update user's following
        // TODO: better implementation
        await db_1.db.update(users_models_1.userSchema).set({
            "following": currentUser[0].following + 1,
        }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.id, Number(userToken.id)));
        return true;
    };
    helper().then((data) => {
        if (!data) {
            res.send("Error");
        }
        else {
            res.send("Done");
        }
    }).catch((err) => {
        next(err);
    });
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

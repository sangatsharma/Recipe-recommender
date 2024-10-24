"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.notificationSchema = exports.favouriteRecipes = exports.passwordResetSchema = exports.followerSchema = exports.userPref = exports.userSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const recipes_models_1 = require("../recipes/recipes.models");
const pg_core_2 = require("drizzle-orm/pg-core");
// Schema for user
exports.userSchema = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password"),
    bio: (0, pg_core_1.text)("bio"),
    profile_pic: (0, pg_core_1.text)("profile_pic"),
    verified: (0, pg_core_1.integer)("verified").notNull().default(0),
    joinedOn: (0, pg_core_1.timestamp)("joinedOn", {
        withTimezone: true
    }).defaultNow().notNull(),
    birthday: (0, pg_core_2.date)("birthday"),
    city: (0, pg_core_1.text)("city"),
    // followers: integer("followers").default(0).notNull(),
    // following: integer("following").default(0).notNull(),
    followers: (0, pg_core_1.integer)("followers").array().notNull().default((0, drizzle_orm_1.sql) `'{}'::integer[]`),
    following: (0, pg_core_1.integer)("following").array().notNull().default((0, drizzle_orm_1.sql) `'{}'::integer[]`),
    posts: (0, pg_core_1.integer)("posts").array().notNull().default((0, drizzle_orm_1.sql) `'{}'::integer[]`),
    visitHistory: (0, pg_core_1.text)("visitHistory").array().notNull().default((0, drizzle_orm_1.sql) `'{}'::integer[]`),
    favourite: (0, pg_core_1.integer)("favourite").array().notNull().default((0, drizzle_orm_1.sql) `'{}'::integer[]`),
});
// User Preferences
exports.userPref = (0, pg_core_1.pgTable)("userPref", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    userId: (0, pg_core_1.integer)("userId").references(() => exports.userSchema.id, { onDelete: "cascade" }),
    dietaryRestrictions: (0, pg_core_1.text)("dietaryRestriction"),
    favCuisines: (0, pg_core_1.text)("favCuisines"),
    disliked: (0, pg_core_1.text)("disliked"),
    preferredMeal: (0, pg_core_1.text)("preferredMeal"),
    diseases: (0, pg_core_1.text)("diseases")
});
exports.followerSchema = (0, pg_core_1.pgTable)("followers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    follower: (0, pg_core_1.integer)("follower").references(() => exports.userSchema.id, { onDelete: "cascade" }),
    followedUser: (0, pg_core_1.integer)("followedUser").references(() => exports.userSchema.id, { onDelete: "cascade" }),
});
exports.passwordResetSchema = (0, pg_core_1.pgTable)("passwordReset", {
    resetToken: (0, pg_core_1.text)("resetToken").notNull(),
    newPassword: (0, pg_core_1.text)("newPassword").notNull(),
});
exports.favouriteRecipes = (0, pg_core_1.pgTable)("favouriteRecipes", {
    userId: (0, pg_core_1.integer)("userId").notNull().references(() => exports.userSchema.id, { onDelete: "cascade" }),
    recipeId: (0, pg_core_1.integer)("recipeId").notNull().references(() => recipes_models_1.recipeSchema.RecipeId, { onDelete: "cascade" }),
    favouritedOn: (0, pg_core_1.timestamp)("favouritedOn", {
        withTimezone: true,
    }).defaultNow().notNull()
});
exports.notificationSchema = (0, pg_core_1.pgTable)("notificationSchema", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    type: (0, pg_core_1.text)("type").notNull(),
    by: (0, pg_core_1.integer)("by").references(() => exports.userSchema.id, { onDelete: "cascade" }),
    to: (0, pg_core_1.integer)("to").references(() => exports.userSchema.id, { onDelete: "cascade" }),
    name: (0, pg_core_1.text)("name").notNull(),
    time: (0, pg_core_1.timestamp)("time", {
        withTimezone: true,
    }).defaultNow().notNull(),
    extra: (0, pg_core_1.text)("extra")
});
// One to Many Relation: A user can post multiple recipies
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userSchema, ({ many }) => ({
    recipies: many(recipes_models_1.recipeSchema),
}));

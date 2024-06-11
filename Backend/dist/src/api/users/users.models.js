"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.followerSchema = exports.userSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const recipes_models_1 = require("../recipes/recipes.models");
// Schema for user
exports.userSchema = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    joinedOn: (0, pg_core_1.timestamp)("joinedOn", {
        withTimezone: true
    }).defaultNow(),
    followers: (0, pg_core_1.serial)("followers"),
    following: (0, pg_core_1.serial)("following"),
});
exports.followerSchema = (0, pg_core_1.pgTable)("followers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    follower: (0, pg_core_1.integer)("follower").references(() => exports.userSchema.id, { onDelete: "cascade" }),
    followedUser: (0, pg_core_1.integer)("followedUser").references(() => exports.userSchema.id, { onDelete: "cascade" }),
});
// One to Many Relation: A user can post multiple recipies
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userSchema, ({ many }) => ({
    recipies: many(recipes_models_1.recipeSchema),
}));

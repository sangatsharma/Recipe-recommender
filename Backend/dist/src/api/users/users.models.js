"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.passwordResetSchema = exports.followerSchema = exports.userSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const recipes_models_1 = require("../recipes/recipes.models");
// Schema for user
exports.userSchema = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password"),
    verified: (0, pg_core_1.integer)("verified").notNull().default(0),
    joinedOn: (0, pg_core_1.timestamp)("joinedOn", {
        withTimezone: true
    }).defaultNow().notNull(),
    followers: (0, pg_core_1.integer)("followers").default(0).notNull(),
    following: (0, pg_core_1.integer)("following").default(0).notNull(),
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
// export const favouriteRecipes = pgTable("favouriteRecipes", {
//   userId: integer("userId").notNull().references(() => userSchema.id, { onDelete: "cascade" }),
//   recipeId: integer("recipeId").notNull().references(() => recipeSchema.RecipeId, { onDelete: "cascade" }),
//   favouritedOn: timestamp("favouritedOn", {
//     withTimezone: true,
//   })
// });
// One to Many Relation: A user can post multiple recipies
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userSchema, ({ many }) => ({
    recipies: many(recipes_models_1.recipeSchema),
}));

import { relations, sql } from "drizzle-orm";
import { serial, text, pgTable, timestamp, integer } from "drizzle-orm/pg-core";
import { recipeSchema } from "../recipes/recipes.models";
import { date } from "drizzle-orm/pg-core";

// Schema for user
export const userSchema = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  bio: text("bio"),
  profile_pic: text("profile_pic"),
  verified: integer("verified").notNull().default(0),
  joinedOn: timestamp("joinedOn", {
    withTimezone: true
  }).defaultNow().notNull(),
  birthday: date("birthday"),
  city: text("city"),
  followers: integer("followers").default(0).notNull(),
  following: integer("following").default(0).notNull(),
  posts: integer("posts").default(0).notNull(),
  mostViewed: text("mostViewed"),
  favourite: integer("favourite").array().notNull().default(sql`'{}'::integer[]`),
});

// User Preferences
export const userPref = pgTable("userPref", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("userId").references(() => userSchema.id, { onDelete: "cascade" }),
  dietaryRestrictions: text("dietaryRestriction"),
  favCuisines: text("favCuisines"),
  disliked: text("disliked"),
  preferredMeal: text("preferredMeal"),
  diseases: text("diseases")
});

export const followerSchema = pgTable("followers", {
  id: serial("id").primaryKey(),
  follower: integer("follower").references(() => userSchema.id, { onDelete: "cascade" }),
  followedUser: integer("followedUser").references(() => userSchema.id, { onDelete: "cascade" }),
});

export const passwordResetSchema = pgTable("passwordReset", {
  resetToken: text("resetToken").notNull(),
  newPassword: text("newPassword").notNull(),
});

export const favouriteRecipes = pgTable("favouriteRecipes", {
  userId: integer("userId").notNull().references(() => userSchema.id, { onDelete: "cascade" }),
  recipeId: integer("recipeId").notNull().references(() => recipeSchema.RecipeId, { onDelete: "cascade" }),
  favouritedOn: timestamp("favouritedOn", {
    withTimezone: true,
  }).defaultNow().notNull()
});

// One to Many Relation: A user can post multiple recipies
export const userRelations = relations(userSchema, ({ many }) => ({
  recipies: many(recipeSchema),
}));
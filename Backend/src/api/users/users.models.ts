import { relations } from "drizzle-orm";
import { serial, text, pgTable, timestamp, integer } from "drizzle-orm/pg-core";
import { recipeSchema } from "../recipes/recipes.models";

// Schema for user
export const userSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  joinedOn: timestamp("joinedOn", {
    withTimezone: true
  }).defaultNow(),
  followers: serial("followers"),
  following: serial("following"),
});

export const followerSchema = pgTable("followers", {
  id: serial("id").primaryKey(),
  follower: integer("follower").references(() => userSchema.id, { onDelete: "cascade" }),
  followedUser: integer("followedUser").references(() => userSchema.id, { onDelete: "cascade" }),
});

// One to Many Relation: A user can post multiple recipies
export const userRelations = relations(userSchema, ({ many }) => ({
  recipies: many(recipeSchema),
}));
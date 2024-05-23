/*
  SCHEMA FOR DB TABLES
*/
import { relations } from "drizzle-orm";
import { serial, text, pgTable, timestamp,integer } from "drizzle-orm/pg-core";

// Schema for recipes (TODO)
export const recipeSchema = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  authorId: integer("authorId").notNull(),
  cookTime: integer("cookTime").notNull(),
  prepTime: integer("prepTime").notNull(),
  datePublished: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  images: text("images"),
  instructions: text("instructions").notNull(),
});

// Schema for user
export const userSchema = pgTable("users" , {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  joinedOn: timestamp("joinedOn", {
    withTimezone: true
  }).defaultNow(),
});

// One to Many Relation: A user can post multiple recipies
export const userRelations = relations(userSchema, ({ many }) => ({
  recipies: many(recipeSchema),
}));

// One to One Relation: One recipe will have single author
export const recipeRelations = relations(recipeSchema, ({ one }) => ({
  author: one(userSchema, {
    fields: [recipeSchema.authorId],
    references: [userSchema.id],
  }),
}));
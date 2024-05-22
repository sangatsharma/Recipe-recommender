/*
  SCHEMA FOR DB TABLES
*/
import { serial, text, numeric, pgTable, timestamp } from "drizzle-orm/pg-core";

// Schema for recipes (TODO)
export const recipeSchema = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cookTime: numeric("cookTime").notNull(),
  prepTime: numeric("prepTime").notNull(),
  datePublished: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  images: text("images"),
  instructions: text("instructions").notNull(),
});

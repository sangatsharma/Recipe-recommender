import { relations } from "drizzle-orm";
import { serial, text, pgTable, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { userSchema } from "@/api/users/users.models";

// Schema for recipes (TODO)
export const recipeSchema = pgTable("recipes", {
  RecipeId: serial("RecipeId").primaryKey(),
  Name: text("Name").notNull(),
  AuthorId: integer("AuthorId").notNull(),
  CookTime: integer("CookTime").notNull(),
  PrepTime: integer("PrepTime").notNull(),
  TotalTime: integer("TotalTime").notNull(),
  DatePublished: timestamp("DatePublished", {
    withTimezone: true,
  }).defaultNow(),
  Description: text("Description").notNull(),
  TotalLikes: integer("TotalLikes").default(0),
  Images: text("Images"),
  RecipeCategory: text("RecipeCategory"),
  Keywords: text("Keywords"),
  RecipeIngredientQualities: text("RecipeIngredientQualities"),
  RecipeIngredientParts: text("RecipeIngredientParts"),
  AggregatedRating: numeric("AggregatedRating"),
  ReviewCount: numeric("ReviewCount"),
  Calories: numeric("Calories"),
  FatContent: numeric("FatContent"),
  SaturatedFatContent: numeric("SaturatedFatContent"),
  CholesterolContent: numeric("CholesterolContent"),
  SodiumContent: numeric("SodiumContent"),
  CarbohydrateContent: numeric("CarbohydrateContent"),
  FiberContent: numeric("FiberContent"),
  SugarContent: numeric("SugarContent"),
  ProteinContent: numeric("ProteinContent"),
  RecipeInstructions: text("RecipeInstructions").notNull(),
});

// One recipies can have multiple likes
export const recipeLikes = pgTable("recipeLikes", {
  recipeId: integer("recipeId").notNull().references(() => recipeSchema.RecipeId, { onDelete: "cascade" }),
  userId: integer("userId").notNull().references(() => userSchema.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  review: text("review")
});

// One to One Relation: One recipe will have single author
export const recipeRelations = relations(recipeSchema, ({ one }) => ({
  author: one(userSchema, {
    fields: [recipeSchema.AuthorId],
    references: [userSchema.id],
  }),
}));
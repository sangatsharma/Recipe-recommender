"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRelations = exports.recipeLikes = exports.recipeSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const users_models_1 = require("../../api/users/users.models");
// Schema for recipes (TODO)
exports.recipeSchema = (0, pg_core_1.pgTable)("recipes", {
    RecipeId: (0, pg_core_1.serial)("RecipeId").primaryKey(),
    Name: (0, pg_core_1.text)("Name").notNull(),
    AuthorId: (0, pg_core_1.integer)("AuthorId").notNull(),
    CookTime: (0, pg_core_1.integer)("CookTime").notNull(),
    PrepTime: (0, pg_core_1.integer)("PrepTime").notNull(),
    TotalTime: (0, pg_core_1.integer)("TotalTime").notNull(),
    DatePublished: (0, pg_core_1.timestamp)("DatePublished", {
        withTimezone: true,
    }).defaultNow(),
    Description: (0, pg_core_1.text)("Description").notNull(),
    TotalLikes: (0, pg_core_1.integer)("TotalLikes").default(0),
    Images: (0, pg_core_1.text)("Images"),
    RecipeCategory: (0, pg_core_1.text)("RecipeCategory"),
    Keywords: (0, pg_core_1.text)("Keywords"),
    RecipeIngredientQualities: (0, pg_core_1.text)("RecipeIngredientQualities"),
    RecipeIngredientParts: (0, pg_core_1.text)("RecipeIngredientParts"),
    AggregatedRating: (0, pg_core_1.numeric)("AggregatedRating"),
    ReviewCount: (0, pg_core_1.numeric)("ReviewCount"),
    Calories: (0, pg_core_1.numeric)("Calories"),
    FatContent: (0, pg_core_1.numeric)("FatContent"),
    SaturatedFatContent: (0, pg_core_1.numeric)("SaturatedFatContent"),
    CholesterolContent: (0, pg_core_1.numeric)("CholesterolContent"),
    SodiumContent: (0, pg_core_1.numeric)("SodiumContent"),
    CarbohydrateContent: (0, pg_core_1.numeric)("CarbohydrateContent"),
    FiberContent: (0, pg_core_1.numeric)("FiberContent"),
    SugarContent: (0, pg_core_1.numeric)("SugarContent"),
    ProteinContent: (0, pg_core_1.numeric)("ProteinContent"),
    RecipeInstructions: (0, pg_core_1.text)("RecipeInstructions").notNull(),
});
// One recipies can have multiple likes
exports.recipeLikes = (0, pg_core_1.pgTable)("recipeLikes", {
    recipeId: (0, pg_core_1.integer)("recipeId").notNull().references(() => exports.recipeSchema.RecipeId, { onDelete: "cascade" }),
    userId: (0, pg_core_1.integer)("userId").notNull().references(() => users_models_1.userSchema.id, { onDelete: "cascade" })
});
// One to One Relation: One recipe will have single author
exports.recipeRelations = (0, drizzle_orm_1.relations)(exports.recipeSchema, ({ one }) => ({
    author: one(users_models_1.userSchema, {
        fields: [exports.recipeSchema.AuthorId],
        references: [users_models_1.userSchema.id],
    }),
}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeLikeHandler = exports.recipeDetails = exports.filterRecipe = exports.addNewRecipe = exports.returnAllRecipies = void 0;
const db_1 = require("../../utils/db");
const recipes_models_1 = require("./recipes.models");
const drizzle_orm_1 = require("drizzle-orm");
/*
  FETCH ALL RECIPIES
*/
const returnAllRecipies = (_, res, next) => {
    const helper = async () => {
        // Fetch all data from database
        const recipeData = await db_1.db.select().from(recipes_models_1.recipeSchema);
        return recipeData;
    };
    helper().then((data) => {
        return res.json(data);
    }).catch((err) => {
        next(err);
    });
};
exports.returnAllRecipies = returnAllRecipies;
/*
  ADD A NEW RECIPE
*/
const addNewRecipe = (req, res, next) => {
    const data = req.body;
    // TODO: get author id from token
    data["AuthorId"] = 1;
    // TODO: Validate data
    const helper = async () => {
        await db_1.db.insert(recipes_models_1.recipeSchema).values(data);
    };
    helper().then(() => {
        return res.json({ "success": "true" });
    }).catch((err) => {
        next(err);
    });
};
exports.addNewRecipe = addNewRecipe;
/*
  FILTER RECIPIES
  USAGE: Pass an object with options to filter through.
  EG:
    {
      name: "Biriyani",
      cookTime: 60
    }

    returns all recipies with name "Biriyani" and cookTime <= 60 minutes.
*/
const filterRecipe = (req, res, next) => {
    // Get filter data from frontend
    const data = req.body;
    const q = [];
    // If name search is present
    let nameSearch = false;
    let nameQuery = "";
    // Loop through search filters
    for (const k of Object.keys(data)) {
        if (k === "id") {
            q.push((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, data["id"]));
        }
        else if (k === "name") {
            nameSearch = true;
            nameQuery = data["name"];
        }
        else if (k === "cookTime")
            q.push((0, drizzle_orm_1.lte)(recipes_models_1.recipeSchema.CookTime, data["cookTime"]));
        else if (k === "prepTime")
            q.push((0, drizzle_orm_1.lte)(recipes_models_1.recipeSchema.PrepTime, data["prepTime"]));
    }
    const helper = async () => {
        // Apply filter and search DB
        const filteredRes = await db_1.db.select().from(recipes_models_1.recipeSchema).where(nameSearch
            ? (0, drizzle_orm_1.and)((0, drizzle_orm_1.ilike)(recipes_models_1.recipeSchema.Name, "%" + nameQuery + "%"), (0, drizzle_orm_1.and)(...q))
            : (0, drizzle_orm_1.and)(...q));
        // Return responses
        return filteredRes;
    };
    helper().then((data) => {
        // If no match found
        if (data.length === 0)
            return res.json({
                success: false,
                body: {
                    message: "No recipe found with provided search filters"
                }
            });
        // Else
        return res.json({
            success: true,
            length: data.length,
            body: data
        });
    }).catch((err) => {
        next(err);
    });
};
exports.filterRecipe = filterRecipe;
/*
  SEARCH FOR A SPECIFIC RECIPE
*/
const recipeDetails = async (req, res, next) => {
    // Get recipe id from parameter
    const recipeId = Number(req.params.id);
    try {
        // Get the recipe
        const recipeDB = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, recipeId));
        // If not found
        if (recipeDB.length === 0) {
            return res.send({
                success: false,
                body: {
                    message: "Recipe with provided id not found",
                },
            });
        }
        // If found
        return res.send({
            success: true,
            body: recipeDB[0],
        });
    }
    catch (err) {
        next(err);
    }
};
exports.recipeDetails = recipeDetails;
const recipeLikeHandler = async (req, res, next) => {
    // TODO: Better imp with types
    const data = req.body;
    const cookieInfo = res.locals.user;
    try {
        // Get the recipe
        const recipeDB = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, data.recipeId));
        // If not found
        if (recipeDB.length === 0) {
            return res.send({
                success: false,
                body: {
                    message: "Recipe with provided id not found",
                },
            });
        }
        // Check if user already liked this post
        const alreadyLiked = await db_1.db.select().from(recipes_models_1.recipeLikes).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(recipes_models_1.recipeLikes.recipeId, data.recipeId), (0, drizzle_orm_1.eq)(recipes_models_1.recipeLikes.userId, cookieInfo.id)));
        // If no, like
        if (alreadyLiked.length === 0) {
            await db_1.db.insert(recipes_models_1.recipeLikes).values({ recipeId: data.recipeId, userId: cookieInfo.id });
            await db_1.db.update(recipes_models_1.recipeSchema).set({ TotalLikes: recipeDB[0].TotalLikes + 1 }).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, data.recipeId));
        }
        // Else, remove like
        else {
            await db_1.db.delete(recipes_models_1.recipeLikes).where(((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(recipes_models_1.recipeLikes.recipeId, data.recipeId), (0, drizzle_orm_1.eq)(recipes_models_1.recipeLikes.userId, cookieInfo.id))));
            await db_1.db.update(recipes_models_1.recipeSchema).set({ TotalLikes: recipeDB[0].TotalLikes - 1 }).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, data.recipeId));
        }
    }
    catch (err) {
        next(err);
    }
    return res.json({
        succuess: true,
        body: {
            message: "Recipe Liked",
        },
    });
};
exports.recipeLikeHandler = recipeLikeHandler;

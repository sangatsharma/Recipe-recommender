"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRecipe = exports.addNewRecipe = exports.returnAllRecipies = void 0;
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
    const data = req.body;
    const q = [];
    for (const k of Object.keys(data)) {
        if (k === "name")
            q.push((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.Name, data["name"]));
        else if (k === "cookTime")
            q.push((0, drizzle_orm_1.lte)(recipes_models_1.recipeSchema.CookTime, data["cookTime"]));
        else if (k === "prepTime")
            q.push((0, drizzle_orm_1.lte)(recipes_models_1.recipeSchema.PrepTime, data["prepTime"]));
    }
    const helper = async () => {
        const filteredRes = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.and)(...q));
        return filteredRes;
    };
    helper().then((data) => {
        return res.json({
            "success": "true",
            "length": data.length,
            "data": data,
        });
    }).catch((err) => {
        next(err);
    });
};
exports.filterRecipe = filterRecipe;

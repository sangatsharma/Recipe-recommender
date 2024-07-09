"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendRecipies = exports.recipeReviewGet = exports.recipeReviewRemoveHandler = exports.recipeReviewAddHandler = exports.recipeDetails = exports.filterRecipe = exports.addNewRecipe = exports.returnAllRecipies = void 0;
const db_1 = require("../../utils/db");
const recipes_models_1 = require("./recipes.models");
const drizzle_orm_1 = require("drizzle-orm");
const users_models_1 = require("../users/users.models");
const auth_helpers_1 = require("../users/auth/auth.helpers");
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
        await db_1.db.update(users_models_1.userSchema).set({ visitHistory: [recipeDB[0].Keywords?.split(", ")[0].slice(3, -1)] });
        console.log(recipeDB);
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
const recipeReviewAddHandler = async (req, res, next) => {
    const body = req.body;
    const userCookie = res.locals.user;
    if (!body?.recipeId || !body?.rating) {
        return res.json({
            success: false,
            body: {
                message: "Please provide all required fields",
            }
        });
    }
    try {
        // Get the recipe
        const recipeDB = await db_1.db.select().from(recipes_models_1.recipeSchema).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeSchema.RecipeId, body.recipeId));
        // If not found
        if (recipeDB.length === 0) {
            return res.send({
                success: false,
                body: {
                    message: "Recipe with provided id not found",
                },
            });
        }
        // Add review
        const addedReview = await db_1.db.insert(recipes_models_1.recipeReview).values({
            recipeId: body.recipeId,
            userId: userCookie.id,
            rating: body.rating,
            review: (body?.review) ? body.review : null,
        }).returning();
        return res.json({
            success: true,
            body: addedReview
        });
    }
    catch (err) {
        next(err);
    }
};
exports.recipeReviewAddHandler = recipeReviewAddHandler;
const recipeReviewRemoveHandler = async (req, res, next) => {
    // Pass
    const body = req.body;
    const userCookie = res.locals.user;
    if (!body?.id) {
        return res.json({
            success: false,
            body: {
                message: "Please provide all required fields",
            }
        });
    }
    try {
        // Check review Id
        const reviewDb = await db_1.db.select().from(recipes_models_1.recipeReview).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeReview.reviewId, body.id));
        // Exists or not
        if (reviewDb.length === 0) {
            return res.json({
                success: false,
                body: {
                    message: "Invalid review Id",
                }
            });
        }
        // Check who posted it
        else if (reviewDb[0].userId !== userCookie.id) {
            return res.json({
                success: false,
                body: {
                    message: "Unauthorized Operation",
                }
            });
        }
        // Remove the review
        await db_1.db.delete(recipes_models_1.recipeReview).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeReview.reviewId, body.id));
        return res.json({
            success: true,
            body: {
                message: "Review removed",
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.recipeReviewRemoveHandler = recipeReviewRemoveHandler;
/*
 Get review details for recipes
*/
const recipeReviewGet = async (req, res, next) => {
    const id = req.params.id;
    try {
        // Get reviews from provided recipeId with username
        const reviewDb = await db_1.db.select().from(recipes_models_1.recipeReview).leftJoin(users_models_1.userSchema, (0, drizzle_orm_1.eq)(recipes_models_1.recipeReview.userId, users_models_1.userSchema.id)).where((0, drizzle_orm_1.eq)(recipes_models_1.recipeReview.recipeId, Number(id)));
        // Return only required data
        const resData = reviewDb.map((reviewItem) => {
            const uNameTmp = { userName: reviewItem.users?.name };
            return { ...reviewItem.recipeReview, ...uNameTmp };
        });
        // Return data
        return res.json({
            success: true,
            length: resData.length,
            body: resData
        });
    }
    catch (err) {
        next(err);
    }
};
exports.recipeReviewGet = recipeReviewGet;
// DEMO: NOT COMPLETE
const recommendRecipies = async (req, res, next) => {
    const userCookie = res.locals.user;
    try {
        const userInfo = await (0, auth_helpers_1.userExists)(userCookie.email);
        if (!userInfo.success)
            return res.json(userInfo);
        let dbRes = [];
        if (userInfo.body.visitHistory.length === 0) {
            dbRes = (await db_1.db.select().from(recipes_models_1.recipeSchema).limit(10));
        }
        else {
            // let c = 6;
            // for (const a of userInfo.body.mostViewed?.split(" ") || []) {
            //   const sqlQuery = `SELECT * FROM recipes where "Keywords" like '%${a}%'`;
            //   const dbResTmp = await db.execute(sql.raw(sqlQuery)) as RecipeSchemaType[];
            //   // const dbResTmp = (await db.select().from(recipeSchema).where(ilike(recipeSchema.Keywords, "%" + '"Meat"' + "%")));
            //   dbRes = dbRes.concat(dbResTmp);
            //   c = Math.floor(c / 2);
            const sqlQuery = `SELECT * FROM recipes where "Keywords" like '%${userInfo.body.visitHistory[0]}%' LIMIT 10`;
            dbRes = await db_1.db.execute(drizzle_orm_1.sql.raw(sqlQuery));
        }
        return res.json({
            "success": true,
            "length": dbRes.length,
            "data": dbRes
        });
    }
    catch (err) {
        next(err);
    }
};
exports.recommendRecipies = recommendRecipies;

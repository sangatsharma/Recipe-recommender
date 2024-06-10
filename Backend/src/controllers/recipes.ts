/*
  ROUTES REGARDING RECIPES.
  ENDPOINTS:
    -> "/" with GET         = fetch all
    -> "/" with POST        = add data
    -> "/filter" with POST  = search specific
*/

import express, { Request, Response, NextFunction } from "express";
import { db } from "../utils/db";
import { recipeSchema } from "../schema";
import { eq, and, SQL, lte } from "drizzle-orm";

const recipeRouter = express.Router();

/*
  FETCH ALL RECIPIES
*/
recipeRouter.get("/", (_:Request,res:Response, next:NextFunction) => {
  const helper = async () => {

    // Fetch all data from database
    const recipeData = await db.select().from(recipeSchema);
    return recipeData;
  };

  helper().then((data) => {
    return res.json(data);
  }).catch((err) => {
    next(err);
  });

});

/*
  ADD A NEW RECIPE
*/
recipeRouter.post("/", (req:Request,res:Response, next:NextFunction) => {
  const data = req.body;

  // TODO: get author id from token
  data["authorId"] = 1;
  // TODO: Validate data
  const helper = async () => {
    await db.insert(recipeSchema).values(data);
  };

  helper().then(() => {
    return res.json({ "success": "true" });
  }).catch((err) => {
    next(err);
  });
});


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
recipeRouter.post("/filter", (req:Request, res:Response, next:NextFunction) => {

  const data = req.body;
  const q:SQL[] = [];

  for (const k of Object.keys(data)){
    if (k === "name") q.push(eq(recipeSchema.name, data["name"]));
    else if (k === "cookTime") q.push(lte(recipeSchema.cookTime, data["cookTime"]));
    else if (k === "prepTime") q.push(lte(recipeSchema.prepTime, data["prepTime"]));
  }

  const helper = async () => {
    const filteredRes = await db.select().from(recipeSchema).where(and(...q));
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
});

export default recipeRouter;
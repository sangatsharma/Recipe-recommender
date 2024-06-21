import { NextFunction, Request, Response } from "express";
import { db } from "@/utils/db";
import { recipeLikes, recipeSchema } from "./recipes.models";
import { SQL, eq, lte, and, ilike } from "drizzle-orm";

/*
  FETCH ALL RECIPIES
*/
export const returnAllRecipies = (_: Request, res: Response, next: NextFunction) => {
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
};


/*
  ADD A NEW RECIPE
*/
export const addNewRecipe = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  // TODO: get author id from token
  data["AuthorId"] = 1;
  // TODO: Validate data
  const helper = async () => {
    await db.insert(recipeSchema).values(data);
  };

  helper().then(() => {
    return res.json({ "success": "true" });
  }).catch((err) => {
    next(err);
  });
};


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
export const filterRecipe = (req: Request, res: Response, next: NextFunction) => {

  // Get filter data from frontend
  const data: Record<string, string | number> = req.body as Record<string, string | number>;
  const q: SQL[] = [];

  // If name search is present
  let nameSearch = false;
  let nameQuery = "";

  // Loop through search filters
  for (const k of Object.keys(data)) {
    if (k === "id") { q.push(eq(recipeSchema.RecipeId, data["id"] as number)); }
    else if (k === "name") { nameSearch = true; nameQuery = data["name"] as string; }
    else if (k === "cookTime") q.push(lte(recipeSchema.CookTime, data["cookTime"] as number));
    else if (k === "prepTime") q.push(lte(recipeSchema.PrepTime, data["prepTime"] as number));
  }
  const helper = async () => {

    // Apply filter and search DB
    const filteredRes = await db.select().from(recipeSchema).where(
      nameSearch
        ? and(ilike(recipeSchema.Name, "%" + nameQuery + "%"), and(...q))
        : and(...q)
    );

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


/*
  SEARCH FOR A SPECIFIC RECIPE
*/
export const recipeDetails = async (req: Request, res: Response, next: NextFunction) => {

  // Get recipe id from parameter
  const recipeId: number = Number(req.params.id);

  try {
    // Get the recipe
    const recipeDB = await db.select().from(recipeSchema).where(eq(recipeSchema.RecipeId, recipeId));

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


export const recipeLikeHandler = async (req: Request, res: Response, next: NextFunction) => {

  // TODO: Better imp with types
  const data = req.body as { recipeId: number };
  const cookieInfo = res.locals.user;

  try {
    // Get the recipe
    const recipeDB = await db.select().from(recipeSchema).where(eq(recipeSchema.RecipeId, data.recipeId));

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
    const alreadyLiked = await db.select().from(recipeLikes).where(and(eq(recipeLikes.recipeId, data.recipeId), eq(recipeLikes.userId, cookieInfo.id as number)));

    // If no, like
    if (alreadyLiked.length === 0) {
      await db.insert(recipeLikes).values({ recipeId: data.recipeId, userId: cookieInfo.id as number });
      await db.update(recipeSchema).set({ TotalLikes: recipeDB[0].TotalLikes as number + 1 }).where(eq(recipeSchema.RecipeId, data.recipeId));
    }

    // Else, remove like
    else {
      await db.delete(recipeLikes).where((and(eq(recipeLikes.recipeId, data.recipeId), eq(recipeLikes.userId, cookieInfo.id as number))));
      await db.update(recipeSchema).set({ TotalLikes: recipeDB[0].TotalLikes as number - 1 }).where(eq(recipeSchema.RecipeId, data.recipeId));
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
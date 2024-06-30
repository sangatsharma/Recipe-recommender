import { NextFunction, Request, Response } from "express";
import { db } from "@/utils/db";
import { recipeReview, recipeSchema } from "./recipes.models";
import { SQL, eq, lte, and, ilike } from "drizzle-orm";
import { userSchema } from "../users/users.models";

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
  type FilterRecord = Record<string, string | number>;
  const data: FilterRecord = req.body as FilterRecord;
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


export const recipeReviewAddHandler = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as { recipeId: number, rating: number, review?: string };
  const userCookie = res.locals.user as { id: number };

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
    const recipeDB = await db.select().from(recipeSchema).where(eq(recipeSchema.RecipeId, body.recipeId));

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
    const addedReview = await db.insert(recipeReview).values({
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


export const recipeReviewRemoveHandler = async (req: Request, res: Response, next: NextFunction) => {
  // Pass
  const body = req.body as { id: number };
  const userCookie = res.locals.user as { id: number };

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
    const reviewDb = await db.select().from(recipeReview).where(eq(recipeReview.reviewId, body.id));

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
    await db.delete(recipeReview).where(eq(recipeReview.reviewId, body.id));
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


/*
 Get review details for recipes
*/
export const recipeReviewGet = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    // Get reviews from provided recipeId with username
    const reviewDb = await db.select().from(recipeReview).leftJoin(userSchema, eq(recipeReview.userId, userSchema.id)).where(eq(recipeReview.recipeId, Number(id)));

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
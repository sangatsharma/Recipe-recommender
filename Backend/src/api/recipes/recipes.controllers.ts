import { NextFunction, Request, Response } from "express";
import { db } from "@/utils/db";
import { recipeReview, recipeSchema, RecipeSchemaType } from "./recipes.models";
import { SQL, eq, lte, and, ilike, sql, arrayContains, arrayOverlaps } from "drizzle-orm";
import { userSchema } from "../users/users.models";
import { userExists } from "../users/auth/auth.helpers";
import { handleUpload } from "@/utils/cloudinary";


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
export const addNewRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;

  // TODO: get author id from token
  data["AuthorId"] = res.locals.user.id as number;
  // data["AuthorId"] = 1;
  // TODO: Validate data
  try {
    if (req.file) {
      const b64 = Buffer.from(req.file?.buffer).toString("base64");
      const dataURI = "data:" + req.file?.mimetype + ";base64," + b64;

      const cldRes = await handleUpload(dataURI);
      data.Images = [cldRes.secure_url];
    }
    await db.insert(recipeSchema).values(data);
    return res.json({ "success": "true" });
  }
  catch (err) {
    next(err);
  }
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


export const filterDemo = (req: Request, res: Response, next: NextFunction) => {
  type Dishes = string;
  type FilterRecordDemo = Record<string, string | Record<string, string>>;
  const dataTmp: FilterRecordDemo = req.body.res as FilterRecordDemo;

  /*
    res.body =
    {
      type: "Recipe",
      options: {
        "Dishes": "Breakfast"
      }
    }
  */

  const que = "SELECT * FROM recipes WHERE ";
  switch (dataTmp.type) {
    case "Recipe":
      type Dishes = string;
      const options = dataTmp.options;
    // if (dataTmp.option?.Dishes === "sasa") {

    // }
  }

  console.log(que);

  return res.json({
    "hello": "world",
  });
};


/*
  SEARCH FOR A SPECIFIC RECIPE
*/
export const recipeDetails = async (req: Request, res: Response, next: NextFunction) => {

  // Get recipe id from parameter
  const recipeId: number = Number(req.params.id);

  const userInfo = res.locals as { email: string };

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

    // await db.update(userSchema).set({ visitHistory: recipeDB[0].Keywords }).where(eq(userSchema.email, userInfo.email));
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

// DEMO: NOT COMPLETE
export const recommendRecipies = async (req: Request, res: Response, next: NextFunction) => {
  const userCookie = res.locals.user as { email: string };
  try {
    const userInfo = await userExists(userCookie.email);
    if (!userInfo.success)
      return res.json(userInfo);

    let dbRes: RecipeSchemaType[] = [] as RecipeSchemaType[];
    if (userInfo.body.visitHistory.length === 0) {
      dbRes = (await db.select().from(recipeSchema).limit(10));
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
      dbRes = await db.execute(sql.raw(sqlQuery)) as RecipeSchemaType[];
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


export const searchRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const searchFilter = req.body as { query: string, type: string, values: string[] };

  // let searchRes: RecipeSchemaType[];
  try {
    if (searchFilter.type === "recipes") {
      const searchRes = await db.select().from(recipeSchema).where(and(ilike(recipeSchema.Name, "%" + searchFilter.query + "%"), arrayContains(recipeSchema.Keywords, searchFilter.values)));
      return res.json(searchRes.length !== 0 ? searchRes : []);
    }
    else if (searchFilter.type === "ingredients") {
      const searchRes = await db.select().from(recipeSchema).where(arrayContains(recipeSchema.RecipeIngredientParts, [searchFilter.query.toLocaleLowerCase()]));
      return res.json(searchRes);
    }
  }
  catch (err) {
    next(err);
  }

  return res.json(searchRecipe);
};
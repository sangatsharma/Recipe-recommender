/****************
* IMPORT
****************/
import { Request, Response, NextFunction } from "express";

// JWT
import jwt from "jsonwebtoken";
import { JsonResponse, JwtPayload } from "./users.types";

import {
  SECRET,
} from "@/utils/config";

// DB
import { and, arrayOverlaps, eq, inArray, sql } from "drizzle-orm";

import { db } from "@/utils/db";
import { RecipeSchemaType, recipeSchema } from "@/api/recipes/recipes.models";
import { favouriteRecipes, followerSchema, userPref, userSchema } from "@/api/users/users.models";
import { userExists } from "./auth/auth.helpers";
import { handleUpload, uploadToCloudinary } from "@/utils/cloudinary";
import { PgDate } from "drizzle-orm/pg-core";


/****************
* ROUTES
****************/

/*
  GET USER DATA
*/
export const userInfoHandler = async (req: Request, res: Response, _: NextFunction) => {

  // Get this data from middleware
  const userJwt: JwtPayload = res.locals.user as JwtPayload;

  // Check if email exists
  const userTmp = await userExists(userJwt.email);

  if (!userTmp.success) {
    return res.json({
      success: false,
      body: {
        message: "User with provoded email not found",
      },
    });
  }

  // Remove password and return user data
  userTmp.body.password = null;
  return res.json(userTmp);
};


/*
  FOLLOW USER
*/
export const followUser = async (req: Request, res: Response, _: NextFunction) => {

  // TODO: TRY-CATCH
  //TODO: CHECK IF ALREADY FOLLOWING
  const data: { email: string } = req.body as { email: string };
  const cookie = req.cookies;

  const userToken = jwt.verify(cookie.auth_token as string, SECRET) as JwtPayload;


  // Make sure user with email exists
  const followedUserTmp = await userExists(data.email);
  const currentUser = await userExists(userToken.email);

  if (!followedUserTmp.success) {

    // User dosen't exist
    const jsonResponse: JsonResponse = {
      "success": false,
      body: {
        "message": "User dosen't exist",
      }
    };

    return res.json(jsonResponse);
  }

  // Get the user to follow
  const followedUser = followedUserTmp.body;

  if (followedUser.email === currentUser.body.email) {
    const jsonResponse: JsonResponse = {
      "success": false,
      body: {
        "message": "Cannot follow yourself",
      }
    };

    return res.json(jsonResponse);

  }

  // Add follower & following
  await db.insert(followerSchema).values({
    follower: Number(userToken.id),
    followedUser: followedUser.id,
  });

  // Update user's followers
  await db.update(userSchema).set({
    "followers": followedUser.followers + 1,
  }).where(eq(userSchema.id, followedUser.id));

  // Update user's following
  // TODO: better implementation
  await db.update(userSchema).set({
    "following": currentUser.body.following + 1,
  }).where(eq(userSchema.id, Number(userToken.id)));

  const jsonResponse: JsonResponse = {
    success: true,
    body: {
      message: `Successfully followed ${followedUser.name}`
    }
  };

  return res.json(jsonResponse);

};


// CHECK IF PROVIDED TOKEN IS VALID OR NOT
export const validateToken = (req: Request, res: Response, _: NextFunction) => {
  const token = req.cookies;

  if (!token.auth_token) {
    return res.json({
      success: false,
      body: {
        message: "Token not available",
      }
    });
  }

  try {
    jwt.verify(token.auth_token as string, SECRET);
    return res.json({
      success: true,
      body: {
        message: "Valid Token",
      }
    });
  }
  catch (err) {
    return res.json({
      success: false,
      body: {
        message: "Invalid Token",
      }
    });
  }
};

export const tmpDemo = (_: Request, res: Response, next: NextFunction) => {
  const helper = async () => {
    // TODO: Get users ID from token
    const data = await db.select().from(recipeSchema).where(eq(recipeSchema.AuthorId, 1));
    return data;
  };

  helper().then((data) => {
    return res.json({ "length": data.length, "data": data });
  }).catch((err) => {
    next(err);
  });
};


/*
  Add/remove recipes to/from favourite
  USAGE:
  {
    recipeId: 'valid id' as number
  }
*/
export const favouriteRecipeHandler = async (req: Request, res: Response, next: NextFunction) => {

  // Get recipeId and cookie info
  // TODO: seperate types
  const body = req.body as { recipeId: number };
  const userCookie = res.locals.user as { id: number };

  try {

    // Check if recipeId is valid
    const recipeDB = await db.select().from(recipeSchema).where(eq(recipeSchema.RecipeId, body.recipeId));
    if (recipeDB.length === 0) {
      return res.json({
        success: false,
        body: {
          message: "Invalid recipe id.",
        }
      });
    }

    // Check if item is aready favourited
    // const alreadyFav = await db.select().from(favouriteRecipes).where(and(eq(favouriteRecipes.recipeId, body.recipeId), eq(favouriteRecipes.userId, userCookie.id)));
    const alreadyFav = await db.select().from(userSchema).where(arrayOverlaps(userSchema.favourite, [body.recipeId]));

    // If no then add
    if (alreadyFav.length === 0) {
      // await db.insert(favouriteRecipes).values({
      //   userId: userCookie.id,
      //   recipeId: recipeDB[0].RecipeId,
      // });
      await db.update(userSchema).set({
        favourite: sql`array_append(${userSchema.favourite}, ${body.recipeId} )`,
      }).where(eq(userSchema.id, userCookie.id));
    }

    // Else, remove
    else {
      // await db.delete(favouriteRecipes).where((and(eq(favouriteRecipes.recipeId, body.recipeId), eq(favouriteRecipes.userId, userCookie.id))));
      await db.update(userSchema).set({
        favourite: sql`array_remove(${userSchema.favourite}, ${body.recipeId})`
      });
    }

    // Return response
    return res.json({
      success: true,
      body: {
        message: "Successfully " + (alreadyFav.length !== 0 ? "removed from " : "added to ") + "favourites."
      }
    });
  }
  catch (err) {
    next(err);
  }
};


/*
  Fetch favourite list
*/
export const recipeFavouriteGetHandler = async (req: Request, res: Response, next: NextFunction) => {

  // User info from cookie
  const userCookie = res.locals.user as { id: number };

  try {

    // Fetch all for the user
    const userInfo = await db.select().from(userSchema).where(eq(userSchema.id, userCookie.id));
    const favRec = await db.select().from(recipeSchema).where(inArray(recipeSchema.RecipeId, userInfo[0].favourite));

    // Return response
    return res.json({
      success: true,
      length: favRec.length,
      body: favRec
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
    if (!(userInfo.body.mostViewed)) {
      dbRes = (await db.select().from(recipeSchema).limit(10));
    }
    else {
      let c = 6;

      for (const a of userInfo.body.mostViewed?.split(" ") || []) {
        const sqlQuery = `SELECT * FROM recipes where "Keywords" like '%${a}%'`;
        const dbResTmp = await db.execute(sql.raw(sqlQuery)) as RecipeSchemaType[];
        // const dbResTmp = (await db.select().from(recipeSchema).where(ilike(recipeSchema.Keywords, "%" + '"Meat"' + "%")));
        dbRes = dbRes.concat(dbResTmp);
        c = Math.floor(c / 2);
      }
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


/*
  UPDATE USER INFO
  USAGE:
  {
    fullName, username, bio, profile_pic
  }
*/
export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  type UpdateUserInfoType = {
    fullName: string,
    username: string,
    bio: string,
    birthday: string,
  };

  // Provide body
  const body = req.body as UpdateUserInfoType;
  const userInfo = res.locals.user as { email: string };
  console.log(req.file);

  const updateData = {} as { name?: string, username?: string, bio?: string, profile_pic: string, birthday?: string };

  // if (body.username) updateData.username = body.username;
  if (body.fullName) updateData.name = body.fullName;
  if (body.bio) updateData.bio = body.bio;
  if (body.birthday) updateData.birthday = body.birthday;


  try {
    // If profile picture provided
    if (req.file) {
      // const b64 = Buffer.from(req.file?.buffer).toString("base64");
      // const dataURI = "data:" + req.file?.mimetype + ";base64," + b64;

      // const cldRes = await handleUpload(dataURI);
      // updateData.profile_pic = cldRes.secure_url;
      const url = await uploadToCloudinary(req.file.buffer) as string;
      updateData.profile_pic = url;
    }
    // Update DB
    console.log(updateData);
    if (Object.keys(updateData).length !== 0)
      await db.update(userSchema).set(updateData).where(eq(userSchema.email, userInfo.email));

    return res.json({
      success: true,
      body: {
        message: "Successfully updated profile"
      }
    });
  }
  catch (err) {
    next(err);
  }
};


export const updateUserPreferences = async (req: Request, res: Response, next: NextFunction) => {

  // Get user info from cookie
  const cookieInfo = res.locals.user as { id: number };

  type UpdateUserPreferencesType = {
    userId: number,
    dietaryRestrictions: string,
    favCuisines: string,
    disliked: string,
    preferredMeal: string,
    diseases: string,
  };

  const body = req.body as UpdateUserPreferencesType;
  body.userId = cookieInfo.id;

  try {

    const userPrefRes = await db.update(userPref).set(body).where(eq(userPref.userId, Number(cookieInfo.id))).returning();

    if (userPrefRes.length === 0) {
      const userPrefRes = await db.insert(userPref).values(body).returning();

      return res.json({
        success: true,
        body: userPrefRes[0]
      });
    }

    return res.json({
      success: true,
      body: userPrefRes[0]
    });
  }
  catch (err) {
    next(err);
  }


};


// Return userPrefs
export const getUserPreferences = async (req: Request, res: Response, next: NextFunction) => {
  const cookieInfo = res.locals.user as { id: string };

  try {
    const userPrefRes = await db.select().from(userPref).where(eq(userPref.userId, Number(cookieInfo.id)));

    return res.json({
      success: true,
      body: userPrefRes[0]
    });
  }
  catch (err) {
    next(err);
  }
};


// Return users complete profile
export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  try {
    // Get followers info
    const followers = await db.select({
      name: userSchema.name,
      email: userSchema.email,
    }).from(followerSchema).rightJoin(userSchema, eq(userSchema.id, followerSchema.followedUser)).where(eq(followerSchema.followedUser, id));

    // Get following info
    const following = await db.select({
      name: userSchema.name,
      email: userSchema.email,
    }).from(followerSchema).rightJoin(userSchema, eq(userSchema.id, followerSchema.follower)).where(eq(followerSchema.follower, id));

    // Get all recipes uploaded by user
    const posts = await db.select().from(recipeSchema).where(eq(recipeSchema.AuthorId, id));

    // Return info
    return res.json({
      success: true,
      body: {
        followers: {
          length: followers.length,
          followers: followers
        },
        following: {
          length: following.length,
          following: following
        },
        posts: {
          length: posts.length,
          posts: posts,
        }
      }
    });
  }
  catch (err) {
    next(err);
  }
};
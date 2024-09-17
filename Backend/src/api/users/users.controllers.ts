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
import { arrayOverlaps, eq, getTableColumns, inArray, sql } from "drizzle-orm";

import { db } from "@/utils/db";
import { recipeSchema } from "@/api/recipes/recipes.models";
import { notificationSchema, userPref, userSchema, UserSchemaType } from "@/api/users/users.models";
import { userExists } from "./auth/auth.helpers";
import { uploadToCloudinary } from "@/utils/cloudinary";


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
  const data: { email: string, action: string } = req.body as { email: string, action: string };
  if (!(data.action === "follow" || data.action === "unfollow")) {
    return res.json({
      success: false,
      body: {
        message: "Invalid action"
      }
    });
  }
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
  // await db.insert(followerSchema).values({
  //   follower: Number(userToken.id),
  //   followedUser: followedUser.id,
  // });
  if (data.action === "follow") {
    await db.update(userSchema).set({
      following: sql`array_append(${userSchema.following}, ${followedUser.id} )`,
    }).where(eq(userSchema.id, currentUser.body.id));

    await db.update(userSchema).set({
      followers: sql`array_append(${userSchema.followers}, ${currentUser.body.id} )`,
    }).where(eq(userSchema.id, followedUser.id));
  }
  else if (data.action === "unfollow") {
    await db.update(userSchema).set({
      following: sql`array_remove(${userSchema.following}, ${followedUser.id} )`,
    }).where(eq(userSchema.id, currentUser.body.id));

    await db.update(userSchema).set({
      followers: sql`array_remove(${userSchema.followers}, ${currentUser.body.id} )`,
    }).where(eq(userSchema.id, followedUser.id));
  }

  await db.insert(notificationSchema).values({
    type: "follow",
    by: currentUser.body.id,
    to: followedUser.id,
    name: currentUser.body.name,
  });

  // Update user's followers
  // await db.update(userSchema).set({
  //   "followers": followedUser.followers + 1,
  // }).where(eq(userSchema.id, followedUser.id));

  // Update user's following
  // TODO: better implementation
  // await db.update(userSchema).set({
  //   "following": currentUser.body.following + 1,
  // }).where(eq(userSchema.id, Number(userToken.id)));

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
    if (userInfo[0].favourite.length === 0) {
      // Return response
      return res.json({
        success: true,
        length: 0,
        body: []
      });
    }
    else {
      const favRec = await db.select().from(recipeSchema).where(inArray(recipeSchema.RecipeId, userInfo[0].favourite));

      // Return response
      return res.json({
        success: true,
        length: favRec.length,
        body: favRec
      });
    }
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
    city: string,
  };

  // Provide body
  const body = req.body as UpdateUserInfoType;
  const userInfo = res.locals.user as { email: string };

  const updateData = {} as { name?: string, username?: string, bio?: string, profile_pic: string, birthday?: string, city?: string };

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
    if (Object.keys(updateData).length !== 0)
      await db.update(userSchema).set(updateData).where(eq(userSchema.email, userInfo.email));

    if (body?.city) {
      await db.update(userSchema).set({ city: body.city }).where(eq(userSchema.email, userInfo.email));
      // const cityName = String(body.city);
      // const userEmail = String(userInfo.email);
      // // const query = `UPDATE "users" SET city = '${cityName}' where "email" = '${String(userInfo.email)}'`
      // await db.execute(sql`UPDATE users SET city = '12' where email = '${userEmail}' `);
    }

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
    // Check if email exists
    const userTmp: UserSchemaType[] = await db.select().from(userSchema).where(eq(userSchema.id, id));

    if (userTmp.length === 0) {
      return res.json({
        success: false,
        body: {
          message: "User with provoded email not found",
        },
      });
    }

    const userRes = {
      success: true,
      body: userTmp[0]
    };

    return res.json(userRes);

    // Remove password and return user data
    // return res.json(userTmp);
  }
  catch (err) {
    next(err);
  }
};


export const notificationCont = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await db.select().from(notificationSchema).where(eq(notificationSchema.to, Number(res.locals.user.id)));

    return res.json({
      success: true,
      message: {
        body: notifications,
      }
    });
  }
  catch (err) {
    console.log(err);
    next(err);
  }
};
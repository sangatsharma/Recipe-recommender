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
import { eq } from "drizzle-orm";

import { db } from "@/utils/db";
import { recipeSchema } from "@/api/recipes/recipes.models";
import { followerSchema, userSchema } from "@/api/users/users.models";
import { userExists } from "./auth/auth.helpers";

/****************
* ROUTES
****************/

/*
  FOLLOW USER
*/
export const followUser = async (req: Request, res: Response, _: NextFunction) => {

  // TODO: TRY-CATCH
  //TODO: CHECK IF ALREADY FOLLOWING
  const data: { email: string } = req.body as { email: string };
  const cookie = req.cookies;

  const userToken = jwt.verify(cookie.token as string, SECRET) as JwtPayload;


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

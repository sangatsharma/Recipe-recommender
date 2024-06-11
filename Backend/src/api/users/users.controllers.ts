/****************
* IMPORT
****************/
import { Request, Response, NextFunction } from "express";

// JWT
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./users.types";

import { SECRET } from "@/utils/config";

// DB
import { eq } from "drizzle-orm";

import { db } from "@/utils/db";
import { recipeSchema } from "@/api/recipes/recipes.models";
import { followerSchema, userSchema } from "@/api/users/users.models";
import { handleToken } from "./users.helpers";




/****************
* ROUTES
****************/


/*
  REGISTER USER
*/
export const userRegisterHandler = (req: Request, res: Response, next: NextFunction) => {

  // Get credentails
  const body = req.body;

  // Initialize followers and following to 0
  body.followers = 0;
  body.following = 0;

  // Email and Password are required
  //TODO: Check for all required fields
  if (!body.email || !body.password || !body.name) {
    return res.json({
      "success": false,
      "body": {
        "message": "Empty fields",
      },
    });
  }

  const helper = async () => {
    const saltRound = 10;

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, saltRound);

    // Store hashed password
    body["password"] = passwordHash;

    try {

      // Save user
      const userData = (await db.insert(userSchema).values(body).returning())[0];

      return handleToken(userData, res);
    }
    catch (e) {
      next(e);
    }
  };

  helper().then((body) => {
    return res.json({ "success": body?.success, "body": body?.body });
  }).catch((err) => {
    next(err);
  });

};


/*
  LOGIN USER
*/
export const userLoginHandler = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  // Email and Password are required
  if (!body.email || !body.password) {
    return res.json({
      "success": false,
      "body": {
        "message": "Empty fields",
      },
    });
  }

  const helper = async () => {
    try {

      // Check if user exists or not
      const userTmp = (await db.select().from(userSchema).where(eq(userSchema.email, body.email)));

      if (userTmp.length === 0) {
        return ({
          "success": false,
          "body": {
            "message": "User with this email dosen't exist",
          },
        });
      }

      const userData = userTmp[0];

      // Compare to validate password
      const passswordCorrect = await bcrypt.compare(body.password, userData.password);

      if (!passswordCorrect) {
        return ({
          "success": false,
          "body": {
            "message": "Incorrect email or password",
          },
        });
      }

      // Generate token, save as cookie
      return handleToken(userData, res);
    }

    catch (e) {
      next(e);
    }

  };

  helper().then((body) => {
    return res.json({ "success": body?.success, "body": body?.body });
  }).catch((err) => {
    next(err);
  });
};


/*
  FOLLOW USER
*/
export const followUser = (req: Request, res: Response, next: NextFunction) => {

  //TODO: CHECK IF ALREADY FOLLOWING
  const data = req.body;
  const cookie = req.cookies;

  const userToken = jwt.verify(cookie.token, SECRET) as JwtPayload;

  const helper = async () => {

    // Make sure user with email exists
    const followedUser = await db.select().from(userSchema).where(eq(userSchema.email, data.email));
    const currentUser = await db.select().from(userSchema).where(eq(userSchema.id, userToken.id));
    if (followedUser.length === 0) return false;

    // Add follower & following
    await db.insert(followerSchema).values({
      follower: Number(userToken.id),
      followedUser: followedUser[0].id,
    });

    // Update user's followers
    await db.update(userSchema).set({
      "followers": followedUser[0].followers + 1,
    }).where(eq(userSchema.id, followedUser[0].id));

    // Update user's following
    // TODO: better implementation
    await db.update(userSchema).set({
      "following": currentUser[0].following + 1,
    }).where(eq(userSchema.id, Number(userToken.id)));

    return true;
  };

  helper().then((data) => {
    if (!data) {
      res.send("Error");
    } else {
      res.send("Done");
    }
  }).catch((err) => {
    next(err);
  });
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
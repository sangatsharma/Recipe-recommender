import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

import express, { Request, Response, NextFunction } from "express";
import { followerSchema, recipeSchema, userSchema } from "../schema";

import { db } from "../utils/db";
import { eq } from "drizzle-orm";

import { SECRET } from "../utils/config";

// Types
import { UserData, JwtPayload } from "../types/types";

const userRouter = express.Router();


/****************
  REGISTER
*****************/

// DEMO
userRouter.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});

userRouter.post("/register", (req: Request, res: Response, next: NextFunction) => {

  // Get credentails
  const body = req.body;
  const cookie = req.cookies;

  // If logged-in, redirect to root route
  if (cookie.token) return res.redirect("/user");

  // Initialize followers and following to 0
  body.followers = 0;
  body.following = 0;

  // Email and Password are required
  //TODO: Check for all required fields
  if (!body.email || !body.password) {
    return ({
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

});


/****************
  LOGIN
*****************/
userRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const cookie = req.cookies;

  // TODO: Redirect / JSON
  if(cookie.json) return res.redirect("/user");

  // Email and Password are required
  if (!body.email || !body.password) {
    return ({
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
});


userRouter.get("/recipies", (req: Request, res: Response, next: NextFunction) => {
  const helper = async () => {
    // TODO: Get users ID from token
    const data = await db.select().from(recipeSchema).where(eq(recipeSchema.authorId, 1));
    return data;
  };

  helper().then((data) => {
    return res.json({ "data": data });
  }).catch((err) => {
    next(err);
  });
});


userRouter.post("/follow", (req: Request, res: Response, next: NextFunction) => {

  //TODO: CHECK IF ALREADY FOLLOWING
  const data = req.body;
  const cookie = req.cookies;

  if (!cookie.token) {
    return res.redirect("/user/login");
  }

  const userToken = jsonwebtoken.verify(cookie.token, SECRET || "123" ) as JwtPayload;

  const helper = async () => {

    // Make sure user with email exists
    const followedUser = await db.select().from(userSchema).where(eq(userSchema.email, data.email));
    const currentUser = await db.select().from(userSchema).where(eq(userSchema.id,userToken.id));
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


});


/****************
  HELPERS
*****************/
const handleToken = (userData: UserData, res: Response) => {
  const jwtToken = {
    id: userData.id,
    email: userData.email,
  };

  // Sign token
  const token = jsonwebtoken.sign(jwtToken, SECRET || "123");

  // Set cookie
  res.cookie("token", token, {
    maxAge: (1000 * 60 * 60 * 24 * 7),
  });

  // Return user details
  return ({
    "success": true,
    "body": {
      "name": userData.name,
      "email": userData.email,
      "followers": userData.followers,
      "following": userData.following,
    }
  });
};

export default userRouter;
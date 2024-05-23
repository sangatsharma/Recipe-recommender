import express, { Request, Response, NextFunction } from "express";
import { db } from "../utils/db";
import { recipeSchema, userSchema } from "../schema";
import { eq } from "drizzle-orm";

const userRouter = express.Router();

userRouter.post("/", (req:Request, res:Response, next:NextFunction) => {
  const data = req.body;

  const helper = async () => {
    await db.insert(userSchema).values(data);
  };

  helper().then(() => {
    return res.json({ "success": "true" });
  }).catch((err) => {
    next(err);
  });
});

userRouter.get("/recipies", (req:Request, res:Response, next:NextFunction) => {
  const helper = async () => {
    // TODO: Get users ID from token
    const data = await db.select().from(recipeSchema).where(eq(recipeSchema.authorId, 1));
    return data;
  };

  helper().then((data) => {
    console.log(data);
    return res.json({ "data": data });
  }).catch((err) => {
    next(err);
  });
});

export default userRouter;
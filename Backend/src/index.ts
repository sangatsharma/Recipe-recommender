import express from "express";
import cors from "cors";
import recipeRouter from "@/api/recipes/recipes.routes";
import userRouter from "@/api/users/users.routes";

import cookieParser from "cookie-parser";

import { unknownEndPoint } from "@/utils/middleware";
import { errorHandler } from "@/utils/errorHandler";

const app = express();

app.use(cors({ origin: "https://recipe-recommender-backend.vercel.app" }));

app.use(cookieParser());
app.use(express.json());

/*
ROUTES
*/
// Recipe route
app.use("/recipe", recipeRouter); //recipes
app.use("/user", userRouter); //users

// Handle unknown endpoint
app.use(unknownEndPoint);

// Handle errors
app.use(errorHandler);

export default app;
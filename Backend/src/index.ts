import express from "express";
import recipeRouter from "@/api/recipes/recipes.routes";
import userRouter from "@/api/users/users.routes";

import cookieParser from "cookie-parser";

import { unknownEndPoint } from "@/utils/middleware";
import { errorHandler } from "@/utils/errorHandler";

const app = express();

app.use(cookieParser());
app.use(express.json());

/*
ROUTES
*/

// Recipe route
app.use("/recipe", recipeRouter); //recipes
app.use("/user", userRouter); //users

// Handle unknown endpoint
//todo uncomment below line
// app.use(unknownEndPoint);

// Handle errors 
//todo uncomment below line
// app.use(errorHandler);

export default app;

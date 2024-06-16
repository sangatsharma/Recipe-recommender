import express from "express";
import cors from "cors";
import recipeRouter from "@/api/recipes/recipes.routes";
import userRouter from "@/api/users/users.routes";

import cookieParser from "cookie-parser";

import { unknownEndPoint } from "@/utils/middleware";
import { errorHandler } from "@/utils/errorHandler";

const app = express();

app.use(cors({
  //Todo: remove localhost later
  origin: ["https://recipe-recommender-five.vercel.app", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400,
  // methods: "GET, POST"
}));

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

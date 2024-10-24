import express from "express";
import cors from "cors";
import recipeRouter from "@/api/recipes/recipes.routes";
import userRouter from "@/api/users/users.routes";

import cookieParser from "cookie-parser";

import path from "path";
import { unknownEndPoint } from "@/utils/middleware";
import { errorHandler } from "@/utils/errorHandler";

const app = express();

app.use(
  cors({
    //Todo: remove localhost later
    origin: [
      "https://recipe-recommender-five.vercel.app",
      "http://localhost:5173",
      "https://www.ciy.sangat.tech",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400,
    methods: ["GET, POST, PUT, DELETE"],
  })
);

app.set("view engine", "ejs");

console.log(__dirname);
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.json());

/*
ROUTES
*/
// Recipe route
app.use("/user", userRouter); //users
app.use("/recipe", recipeRouter); //recipes

// Handle unknown endpoint
app.use(unknownEndPoint);

// Handle errors
app.use(errorHandler);

export default app;

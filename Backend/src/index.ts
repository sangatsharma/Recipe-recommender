import express from "express";
import  { PORT } from "./utils/config";
import recipeRouter from "./controllers/recipes";
import userRouter from "./controllers/users";

import cookieParser from "cookie-parser";

import { unknownEndPoint, errorHandler } from "./utils/middleware";

const app = express();

app.use(cookieParser());
app.use(express.json());

// Recipe route
app.use("/recipe", recipeRouter);
app.use("/user", userRouter);

// Handle unknown endpoint
app.use(unknownEndPoint);

// Handle errors
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Done");
});
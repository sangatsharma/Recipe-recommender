/*
  ROUTES REGARDING RECIPES.
  ENDPOINTS:
    -> "/" with GET         = fetch all
    -> "/" with POST        = add data
    -> "/filter" with POST  = search specific
*/
import express, { RequestHandler } from "express";
import { addNewRecipe, filterRecipe, recipeDetails, returnAllRecipies } from "./recipes.controllers";

const recipeRouter = express.Router();

// ROUTES
recipeRouter.get("/", returnAllRecipies);
recipeRouter.post("/", addNewRecipe);
recipeRouter.post("/filter", filterRecipe);
recipeRouter.get("/:id", recipeDetails as RequestHandler);

export default recipeRouter;
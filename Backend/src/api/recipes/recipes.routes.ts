/*
  ROUTES REGARDING RECIPES.
  ENDPOINTS:
    -> "/" with GET         = fetch all
    -> "/" with POST        = add data
    -> "/filter" with POST  = search specific
*/
import express, { RequestHandler } from "express";
import { addNewRecipe, filterRecipe, recipeDetails, returnAllRecipies } from "./recipes.controllers";
import { authenticateJWT } from "@/utils/middleware";

const recipeRouter = express.Router();

// ROUTES
recipeRouter.get("/", authenticateJWT, returnAllRecipies);
recipeRouter.post("/", authenticateJWT, addNewRecipe);
recipeRouter.post("/filter", authenticateJWT, filterRecipe);
recipeRouter.get("/:id", authenticateJWT, recipeDetails as RequestHandler);

export default recipeRouter;
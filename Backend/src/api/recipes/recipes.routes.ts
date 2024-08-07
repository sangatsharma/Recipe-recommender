/*
  ROUTES REGARDING RECIPES.
  ENDPOINTS:
    -> "/" with GET         = fetch all
    -> "/" with POST        = add data
    -> "/filter" with POST  = search specific
*/
import express, { RequestHandler } from "express";
import { addNewRecipe, filterDemo, filterRecipe, recipeDetails, recipeReviewAddHandler, recipeReviewGet, recipeReviewRemoveHandler, recommendRecipies, returnAllRecipies, searchRecipe } from "./recipes.controllers";
import { authenticateJWT } from "@/utils/middleware";

import multer from "multer";

const recipeRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ROUTES
recipeRouter.get("/", authenticateJWT, returnAllRecipies);
recipeRouter.post("/", upload.single("images"), authenticateJWT, addNewRecipe as RequestHandler);
recipeRouter.post("/filter", filterRecipe);
recipeRouter.get("/:id", authenticateJWT, recipeDetails as RequestHandler);
recipeRouter.post("/review/add", authenticateJWT, recipeReviewAddHandler as RequestHandler);
recipeRouter.post("/review/remove", authenticateJWT, recipeReviewRemoveHandler as RequestHandler);
recipeRouter.get("/review/:id", authenticateJWT, recipeReviewGet as RequestHandler);

recipeRouter.post("/recommend", authenticateJWT, recommendRecipies as RequestHandler);
recipeRouter.post("/search", authenticateJWT, searchRecipe as RequestHandler);
recipeRouter.post("/demo", filterDemo);

export default recipeRouter;
/*
  ROUTES REGARDING RECIPES.
  ENDPOINTS:
    -> "/" with GET         = fetch all
    -> "/" with POST        = add data
    -> "/filter" with POST  = search specific
*/
import express, { RequestHandler } from "express";
import { addNewRecipe, filterDemo, filterRecipe, recipeDetails, recipeReviewAddHandler, recipeReviewGet, recipeReviewRemoveHandler, returnAllRecipies, searchRecipe, recipeRecommend, exploreRoute } from "./recipes.controllers";
import { authenticateJWT } from "@/utils/middleware";

import multer from "multer";

const recipeRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ROUTES
recipeRouter.get("/", authenticateJWT, returnAllRecipies);
recipeRouter.post("/", upload.array("files"), authenticateJWT, addNewRecipe as RequestHandler);
recipeRouter.post("/filter", filterRecipe);
recipeRouter.post("/review/add", authenticateJWT, recipeReviewAddHandler as RequestHandler);
recipeRouter.post("/review/remove", authenticateJWT, recipeReviewRemoveHandler as RequestHandler);
recipeRouter.get("/review/:id", authenticateJWT, recipeReviewGet as RequestHandler);

recipeRouter.post("/search", searchRecipe as RequestHandler);

recipeRouter.get("/recommend", authenticateJWT, recipeRecommend as RequestHandler);
recipeRouter.post("/demo", filterDemo);
recipeRouter.get("/explore", exploreRoute as RequestHandler);
recipeRouter.get("/:id", recipeDetails as RequestHandler);

export default recipeRouter;
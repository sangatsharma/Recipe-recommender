"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  ROUTES REGARDING RECIPES.
  ENDPOINTS:
    -> "/" with GET         = fetch all
    -> "/" with POST        = add data
    -> "/filter" with POST  = search specific
*/
const express_1 = __importDefault(require("express"));
const recipes_controllers_1 = require("./recipes.controllers");
const middleware_1 = require("../../utils/middleware");
const recipeRouter = express_1.default.Router();
// ROUTES
recipeRouter.get("/", middleware_1.authenticateJWT, recipes_controllers_1.returnAllRecipies);
recipeRouter.post("/", middleware_1.authenticateJWT, recipes_controllers_1.addNewRecipe);
recipeRouter.post("/filter", recipes_controllers_1.filterRecipe);
recipeRouter.get("/:id", middleware_1.authenticateJWT, recipes_controllers_1.recipeDetails);
recipeRouter.post("/review/add", middleware_1.authenticateJWT, recipes_controllers_1.recipeReviewAddHandler);
recipeRouter.post("/review/remove", middleware_1.authenticateJWT, recipes_controllers_1.recipeReviewRemoveHandler);
recipeRouter.get("/review/:id", middleware_1.authenticateJWT, recipes_controllers_1.recipeReviewGet);
exports.default = recipeRouter;

// src/pages/FavoriteRecipes.js
import React, { useEffect } from "react";
import { FavouriteRecipe } from "../utils/sampleData.js";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard.jsx";

const BookmarkRecipes = () => {
  let Save=[];
  useEffect(() => {
     Save = [...FavouriteRecipe];
  }, [FavouriteRecipe]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Favorite Recipes
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="ItemsWrapper">
          {Save.map((item) => {
            return (
              <ItemsCard
                key={item.RecipeId}
                id={item.RecipeId}
                src={item.Src}
                name={item.Name}
                rating={item.Rating}
              ></ItemsCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookmarkRecipes;

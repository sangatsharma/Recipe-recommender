import React, { useEffect, useState } from "react";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard.jsx";
import { useFavContext } from "../context/FavContext.jsx";

import { Helmet } from "react-helmet-async";

const BookmarkRecipes = () => {
  const { tickedItems, toggleTick, Save } = useFavContext();
  const handleClick = (id) => {
    toggleTick(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Favorites Recipes - CIY </title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">
        My Favorite Recipes
      </h1>
      <div className="flex flex-row gap-2 flex-wrap justify-center">
        {tickedItems.size > 0 &&
          Save.map((item) => {
            const regex = /"([^"]+)"/g;
            let matches;
            let urls = [];
            // Loop through all matches
            while ((matches = regex.exec(item.Images)) !== null) {
              urls.push(matches[1]);
            }
            return (
              <ItemsCard
                key={item.RecipeId}
                id={item.RecipeId}
                src={urls[0]}
                name={item.Name}
                RecipeCategory={item.RecipeCategory}
                rating={item.AggregatedRating}
                cooktime={item.CookTime}
                toggleTick={handleClick}
                isFavorite={tickedItems.has(item.RecipeId)}
              ></ItemsCard>
            );
          })}
        {tickedItems.size === 0 && <p>Not saved yet.</p>}
      </div>
    </div>
  );
};

export default BookmarkRecipes;

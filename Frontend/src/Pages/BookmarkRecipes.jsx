import React, { useEffect, useState } from "react";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard.jsx";
import { useFavContext } from "../context/FavContext.jsx";
import { Helmet } from "react-helmet-async";

const BookmarkRecipes = () => {
  const { tickedItems, toggleTick, Save } = useFavContext();
  const [untickItems, setUntickItems] = useState([]);
  const handleClick = (id) => {
    setUntickItems([...untickItems, id]);
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
              <div
                key={item.RecipeId}
                style={{
                  opacity: untickItems.includes(item.RecipeId) ? 0 : 1,
                  transform: untickItems.includes(item.RecipeId)
                    ? "scale(0)"
                    : "",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <ItemsCard
                  id={item.RecipeId}
                  src={urls[0]}
                  name={item.Name}
                  RecipeCategory={item.RecipeCategory}
                  rating={item.AggregatedRating}
                  cooktime={item.CookTime}
                  toggleTick={handleClick}
                  isFavorite={tickedItems.has(item.RecipeId)}
                ></ItemsCard>
              </div>
            );
          })}
        <p
          className={`${
            tickedItems.size > 0
              ? "opacity-0 scale-0 "
              : "opacity-1 scale-125 transition-transform duration-6000  "
          }`}
        >
          Not saved yet.
        </p>
      </div>
    </div>
  );
};

export default BookmarkRecipes;

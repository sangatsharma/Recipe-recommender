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
    <div className="w-full mx-auto px-4 py-8 flex flex-col items-center justify-center ">
      <Helmet>
        <title>Favorites Recipes - CIY </title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">
        My Favorite Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center">
        {tickedItems.size > 0 &&
          Save.map((item) => {
            return (
              <div
                key={item.RecipeId}
                style={{
                  opacity: untickItems.includes(item.RecipeId) ? 0 : 1,
                  transform: untickItems.includes(item.RecipeId)
                    ? "scale(0)"
                    : "",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                <ItemsCard
                  id={item.RecipeId}
                  src={item.Images[0]}
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
      </div>
      <p
        className={`${
          tickedItems.size > 0
            ? "opacity-0 scale-0 "
            : "opacity-1 scale-125 transition-transform duration-6000 "
        }`}
      >
        Not saved yet.
      </p>
    </div>
  );
};

export default BookmarkRecipes;

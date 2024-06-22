import React, { useEffect, useState } from "react";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard.jsx";
import { useFavContext } from "../context/FavContext.jsx";
import axios from "axios";
const BookmarkRecipes = () => {
  const { tickedItems, toggleTick } = useFavContext();
  const [Save, setSave] = useState([]);

  const saveIds = Array.from(tickedItems);
  const handleClick = (id, save = tickedItems) => {
    toggleTick(id);
    console.log(Array.from(tickedItems).length);
    if (Array.from(tickedItems).length == 1) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const data = [];
    const fetchFavItems = async (favItems) => {
      if (favItems.length > 0) {
        try {
          const response = await axios.get(
            `https://recipe-recommender-backend.vercel.app/recipe`,
            {
              withCredentials: true,
            }
          );

          data.push(
            ...response.data.filter((item) => favItems.includes(item.RecipeId))
          );
        } catch (error) {
          console.error("Error fetching item:", error);
          throw error;
        } finally {
          setSave(data);
        }
      }
    };
    fetchFavItems(saveIds);
  }, [tickedItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Favorite Recipes
      </h1>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {saveIds.length > 0 &&
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
                rating={item.AggregatedRating}
                toggleTick={handleClick}
                isFavorite={tickedItems.has(item.RecipeId)}
              ></ItemsCard>
            );
          })}
        {saveIds.length === 0 && <p>Not saved yet.</p>}
      </div>
    </div>
  );
};

export default BookmarkRecipes;

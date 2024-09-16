import ItemsCard from "./ItemsCard.jsx";
import { useEffect, useState } from "react";
import { useFavContext } from "../../../context/FavContext.jsx";
import { useThemeContext } from "../../../context/ThemeContext.jsx";
import { useRecipesContext } from "../../../context/RecipeContext.jsx";

const TrendingFoods = () => {
  const { tickedItems, toggleTick } = useFavContext();
  const { isDarkMode } = useThemeContext();
  const { recipes, loading } = useRecipesContext();

  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    try {
      if (!loading) {
        setPopularItems(recipes);
      }
    } catch (err) {
      console.error(err);
    }
  }, [loading]);

  return (
    popularItems.length > 0 && (
      <div className="w-full flex flex-col justify-center items-center gap-2 mt-4">
        <fieldset
          className={`text-xl border-2 ${
            isDarkMode ? "border-gray-700" : "border-slate-300"
          } rounded-lg p-2`}
        >
          <legend className="px-2 text-3xl text-center font-semibold  decoration-2">
            Popular this week
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularItems.slice(0, 8).map((item) => {
              return (
                <ItemsCard
                  key={item.RecipeId}
                  id={item.RecipeId}
                  src={item.Images[0]}
                  name={item.Name}
                  rating={item.AggregatedRating}
                  RecipeCategory={item.RecipeCategory}
                  cooktime={item.CookTime}
                  toggleTick={toggleTick}
                  isFavorite={tickedItems.has(item.RecipeId)}
                ></ItemsCard>
              );
            })}
          </div>
        </fieldset>
        <fieldset
          className={`text-xl border-2 ${
            isDarkMode ? "border-gray-700" : "border-slate-300"
          } rounded-lg p-2`}
        >
          <legend className="px-2 text-3xl text-center font-semibold  decoration-2">
            Festivals Specials
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularItems.slice(9, 17).map((item) => {
              return (
                <ItemsCard
                  key={item.RecipeId}
                  id={item.RecipeId}
                  src={item.Images[0]}
                  name={item.Name}
                  rating={item.AggregatedRating}
                  RecipeCategory={item.RecipeCategory}
                  cooktime={item.CookTime}
                  toggleTick={toggleTick}
                  isFavorite={tickedItems.has(item.RecipeId)}
                ></ItemsCard>
              );
            })}
          </div>
        </fieldset>
      </div>
    )
  );
};
export default TrendingFoods;

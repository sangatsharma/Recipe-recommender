import ItemsCard from "./ItemsCard.jsx";
import { useEffect, useState } from "react";
import { useFavContext } from "../../../context/FavContext.jsx";
import { useThemeContext } from "../../../context/ThemeContext.jsx";
import { useRecipesContext } from "../../../context/RecipeContext.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const TrendingFoods = () => {
  const { tickedItems, toggleTick } = useFavContext();
  const { isDarkMode } = useThemeContext();
  const { recipes, loading } = useRecipesContext();

  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once or every time you scroll
    });
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
            {popularItems.slice(0, 12).map((item) => {
              return (
                <div key={item.RecipeId} data-aos="fade-up">
                  <ItemsCard
                    id={item.RecipeId}
                    src={item.Images[0]}
                    name={item.Name}
                    rating={item.AggregatedRating}
                    RecipeCategory={item.RecipeCategory}
                    cooktime={item.CookTime}
                    toggleTick={toggleTick}
                    isFavorite={tickedItems.has(item.RecipeId)}
                  ></ItemsCard>
                </div>
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
            {popularItems.map((item) => {
              if (
                item.Keywords.includes("Festival") ||
                item.RecipeCategory === "Festivals"
              )
                return (
                  <div key={item.RecipeId} data-aos="fade-up">
                    <ItemsCard
                      id={item.RecipeId}
                      src={item.Images[0]}
                      name={item.Name}
                      rating={item.AggregatedRating}
                      RecipeCategory={item.RecipeCategory}
                      cooktime={item.CookTime}
                      toggleTick={toggleTick}
                      isFavorite={tickedItems.has(item.RecipeId)}
                    ></ItemsCard>
                  </div>
                );
            })}
          </div>
        </fieldset>
      </div>
    )
  );
};
export default TrendingFoods;

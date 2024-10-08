import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import { useFavContext } from "../context/FavContext.jsx";
import { useThemeContext } from "../context/ThemeContext.jsx";
import { useRecipesContext } from "../context/RecipeContext.jsx";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard.jsx";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
const Recipes = (props) => {
  const { tickedItems, toggleTick } = useFavContext();
  const { isDarkMode } = useThemeContext();
  const { recipes, loading } = useRecipesContext();
  const [allRecipes, setAllRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {

    AOS.init({
      duration: 500, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once or every time you scroll
    });
    try {
      if (!loading) {
        setAllRecipes(recipes);
      }
    } catch (err) {
      console.error(err);
    }
    getRecommendation();
  }, [loading]);

  const getRecommendation = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipe/recommend`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRecommendedRecipes(response.data.body.data1);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center align-middle text-center">
      <Helmet>
        <title>Recipes - CIY </title>
      </Helmet>
      {recommendedRecipes?.length > 0 && (
        <fieldset
          className={`text-xl border-2 ${
            isDarkMode ? "border-gray-700" : "border-slate-300"
          } rounded-lg p-2 m-auto `}
        >
          <legend className="px-2 text-3xl text-center font-semibold  decoration-2">
            Recommended for you
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto place-items-center">
            {recommendedRecipes.map((item) => {
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
      )}

      <fieldset
        className={`text-xl border-2 ${
          isDarkMode ? "border-gray-700" : "border-slate-300"
        } rounded-lg p-2 mt-4`}
      >
        <legend className="px-2 text-3xl text-center font-semibold  decoration-2">
          Nepali Delights
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {allRecipes.map((item) => {
            if (
              item.RecipeCategory == "Nepalese" ||
              item.Keywords.includes("Nepali")
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
  );
};
export default Recipes;

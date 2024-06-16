import "./TrendingFoods.css";
import ItemsCard from "./ItemsCard.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const TrendingFoods = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchItems();

        setPopularItems(items.slice(20, 30));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://recipe-recommender-backend.vercel.app/recipe"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };

  return (
    <div className="TrendingFood">
      <h2>Popular this week</h2>
      <div className="ItemsWrapper">
        {popularItems.map((item) => {
          
          return (
            <ItemsCard
              key={item.RecipeId}
              id={item.RecipeId}
              src={item.Images.replace(/"/g, "")}
              name={item.Name}
              rating={item.AggregatedRating}
            ></ItemsCard>
          );
        })}
      </div>

      
    </div>
  );
};
export default TrendingFoods;
          // // Extract URLs from the string

          // // Remove 'c(' at the start and ')' at the end
          // const cleanedString = item.Images.slice(2, -1);

          // // Split the string by comma and space to separate URLs
          // const urls = cleanedString
          //   .split(/",\s*"/)
          //   .map((url) => url.replace(/(^"|"$)/g, ""));

          // console.log(urls);
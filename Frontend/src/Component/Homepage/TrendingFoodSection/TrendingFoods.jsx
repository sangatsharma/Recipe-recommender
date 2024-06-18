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

        // select the no of items by trending or popular
        //just an example for now
        setPopularItems(items.slice(0, 15));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://recipe-recommender-backend.vercel.app/recipe",
        {
          withCredentials: true
        }
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
            ></ItemsCard>
          );
        })}
      </div>
    </div>
  );
};
export default TrendingFoods;

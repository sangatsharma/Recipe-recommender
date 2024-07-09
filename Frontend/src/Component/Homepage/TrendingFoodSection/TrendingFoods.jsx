import "./TrendingFoods.css";
import ItemsCard from "./ItemsCard.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFavContext } from "../../../context/FavContext.jsx";

const TrendingFoods = () => {
  const { tickedItems, toggleTick } = useFavContext();

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
        `${import.meta.env.VITE_SERVER_URL}/recipe`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };

  return (
    popularItems.length>0 && (
      <div className="TrendingFood">
        <p>Popular this week</p>
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
                RecipeCategory={item.RecipeCategory}
                cooktime={item.CookTime}
                toggleTick={toggleTick}
                isFavorite={tickedItems.has(item.RecipeId)}
              ></ItemsCard>
            );
          })}
        </div>
      </div>
    )
  );
};
export default TrendingFoods;

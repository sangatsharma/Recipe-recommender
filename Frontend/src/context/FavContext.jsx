import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create Context
const FavContext = createContext();

// Provider Component
export const FavItemsProvider = ({ children }) => {
  const [tickedItems, setTickedItems] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favItems = await axios.get(
          "https://recipe-recommender-backend.vercel.app/user/favourite",
          { withCredentials: true }
        );
        const favItemsId = [];
        favItems.data.body.map((item) => favItemsId.push(item.recipeId));
        setTickedItems(new Set(favItemsId));
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTick = async (itemId) => {
    try {
      const updatedFavItems = new Set(tickedItems);
      if (updatedFavItems.has(itemId)) {
        updatedFavItems.delete(itemId);
      } else {
        updatedFavItems.add(itemId);
      }
      setTickedItems(updatedFavItems);
      const response = await axios.post(
        "https://recipe-recommender-backend.vercel.app/user/favourite",
        {
          recipeId: itemId,
        },
        { withCredentials: true }
      );
      if(response.status === 200){
       toast.success(response.data.body.message)
      }
    } catch (error) {
      console.error("Error saving ticked state:", error);
    } finally {
    }
  };

  return (
    <FavContext.Provider value={{ tickedItems, toggleTick, loading }}>
      {children}
    </FavContext.Provider>
  );
};

// Hook to use context
export const useFavContext = () => useContext(FavContext);

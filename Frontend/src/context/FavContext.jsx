import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create Context
const FavContext = createContext();

// Provider Component
export const FavItemsProvider = ({ children }) => {
  const [tickedItems, setTickedItems] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [Save, setSave] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const favItems = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/favourite`,
        { withCredentials: true }
      );
      setSave(favItems.data.body);
      if (favItems.data.body.length > 0) {
        const favItemsId = favItems.data.body.map((item) => item.RecipeId);
        setTickedItems(new Set(favItemsId));
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        `${import.meta.env.VITE_SERVER_URL}/user/favourite`,
        {
          recipeId: itemId,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.body.message);
        fetchData(); // Re-fetch data to ensure state is updated
      }
    } catch (error) {
      console.error("Error saving ticked state:", error);
    }
  };

  return (
    <FavContext.Provider value={{ tickedItems, toggleTick, loading, Save }}>
      {children}
    </FavContext.Provider>
  );
};

// Hook to use context
export const useFavContext = () => useContext(FavContext);

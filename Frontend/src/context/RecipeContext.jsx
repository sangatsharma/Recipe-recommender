import { useContext } from "react";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/recipe`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setRecipes(response.data);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes,loading }}>
      {children}
    </RecipeContext.Provider>
  );
};
export const useRecipesContext = () => useContext(RecipeContext);

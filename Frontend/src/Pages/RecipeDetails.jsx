import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const RecipeDetails = () => {
  const { recipeName } = useParams();
  // Extract name and ID from the param
  const paramParts = recipeName.split("-");
  console.log(paramParts);
  const id = paramParts.pop();
  const itemName = paramParts.join(" "); // Combine the rest as the name
  console.log(`name:${itemName},id:${id}`);
  const location = useLocation();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Parse the ID from the reicpeName
    const id = recipeName.split("-").pop(); // Extract ID assuming the slug format is "slug-id"

    // If state is available, use it, otherwise fetch item by ID
    if (location.state) {
      setItem(location.state);
    } else {
      // Fetch item by ID from database or API
      fetchItemById(id).then((fetchedItem) => setItem(fetchedItem));
    }
  }, [recipeName, location.state]);

  // Simulated function to fetch item by ID from a database
  const fetchItemById = async (id) => {
    try {
      const response = await axios.get(
        `https://recipe-recommender-backend.vercel.app/recipe/${id}`
      );

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error; // Re-throw or handle error appropriately
    }
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h1>Recipe Details for: {item.name}</h1>
      {/* <img src={item.src} alt={item.name} /> */}
      <h3>Description :</h3>
      <p>{item.Description}</p>
      <p>Rating: {item.rating}</p>
      <p>ID: {item.id}</p>
      <h4>Instructions:</h4>
      <p>{item.RecipeInstructions}</p>
    </div>
  );
};

export default RecipeDetails;

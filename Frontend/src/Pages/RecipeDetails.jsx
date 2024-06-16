import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../Component/Wrapper";
import axios from "axios";
import InvalidPage from "../Component/InvalidPage";

const RecipeDetails = () => {
  const { recipeName } = useParams();
  // Extract name and ID from the param
  const paramParts = recipeName.split("-");
  const id = paramParts.pop();
  const itemName = paramParts.join(" "); // Combine the rest as the name
  console.log(`name:${itemName},id:${id}`);
  const location = useLocation();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch item by ID from database or API
    fetchItemById(id).then((fetchedItem) => setItem(fetchedItem));
  }, [recipeName, location.state]);

  // Simulated function to fetch item by ID from a database

  const fetchItemById = async (id) => {
    try {
      const response = await axios.get(
        `https://recipe-recommender-backend.vercel.app/recipe/${id}`,
        {}
      );

      // const response = await axios.get(`http://localhost:4000/recipe/${id}`, {
      // });
      // const response = await axios.post(
      //   "https://recipe-recommender-backend.vercel.app/recipe/filter",
      //   {
      //     name: "Nepali Momo (Nepalese Meat Dumplings)",
      //     id: 42
      //   }
      // );

      if (response.status !== 200) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.data.body;
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };

  if (!item) return <p>Loading...</p>;
  if (itemName.toLowerCase() != item.Name.toLowerCase()) return <InvalidPage />;

  return (
    <Wrapper>
      <div>
        <h1>Recipe Details for: {item.Name}</h1>
        {item.Images && (
          <img
            src={item.Images.replace(/"/g, "")} // Remove quotes from the URL
            alt="Recipe"
            style={{ maxWidth: "100%", marginBottom: "20px" }} // Optional styling
          />
        )}
        <div>
          <p>
            <strong>Recipe ID:</strong> {item.RecipeId}
          </p>
          <p>
            <strong>Cook Time:</strong> {item.CookTime} minutes
          </p>
          <p>
            <strong>Prep Time:</strong> {item.PrepTime} minutes
          </p>
          <p>
            <strong>Total Time:</strong> {item.TotalTime} minutes
          </p>
          <p>
            <strong>Date Published:</strong>{" "}
            {new Date(item.DatePublished).toLocaleString()}
          </p>
          <p>
            <strong>Description:</strong> {item.Description}
          </p>
          <p>
            <strong>Recipe Category:</strong> {item.RecipeCategory}
          </p>
          <p>
            <strong>Keywords:</strong> {item.Keywords}
          </p>
          <p>
            <strong>Calories:</strong> {item.Calories}
          </p>
          <p>
            <strong>Fat Content:</strong> {item.FatContent} g
          </p>
          <p>
            <strong>Saturated Fat Content:</strong> {item.SaturatedFatContent} g
          </p>
          <p>
            <strong>Cholesterol Content:</strong> {item.CholesterolContent} mg
          </p>
          <p>
            <strong>Sodium Content:</strong> {item.SodiumContent} mg
          </p>
          <p>
            <strong>Carbohydrate Content:</strong> {item.CarbohydrateContent} g
          </p>
          <p>
            <strong>Fiber Content:</strong> {item.FiberContent} g
          </p>
          <p>
            <strong>Sugar Content:</strong> {item.SugarContent} g
          </p>
          <p>
            <strong>Protein Content:</strong> {item.ProteinContent} g
          </p>
          <h4>Instructions:</h4>
          <ol>{item.RecipeInstructions}</ol>
        </div>
      </div>
    </Wrapper>
  );
};

export default RecipeDetails;

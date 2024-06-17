import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../Component/Wrapper";
import axios from "axios";
import InvalidPage from "../Component/InvalidPage";

const RecipeDetails = () => {
  const { recipeName } = useParams();

  // Extract name and ID from the param
  const paramParts = recipeName.split("_");
  const id = paramParts.pop();

  //Combine the rest as the name
  const itemName = paramParts.join(" ");

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItem = await fetchItemById(id, itemName);
        setItem(fetchedItem);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchData();
  }, [id, itemName, recipeName]);

  //  function to fetch item by ID from a database
  const fetchItemById = async (RecipeId, RecipeName) => {
    try {
      const response = await axios.post(
        "https://recipe-recommender-backend.vercel.app/recipe/filter",
        {
          name: RecipeName,
          id: RecipeId,
        }
      );
      if (response.data.success == false) return response.data;
      return response.data.body[0];
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Loading...</p>;
  if (item.success === false) return <InvalidPage />;
  const regex = /"([^"]+)"/g;
  let matches;
  let urls = [];
  // Loop through all matches
  while ((matches = regex.exec(item.Images)) !== null) {
    urls.push(matches[1]);
  }
  if (urls.length === 0) console.log("image not found for: ", item.Name);

  return (
    <Wrapper>
      <div>
        <h1>Recipe Details for: {item.Name}</h1>
        <div className="flex flex-row gap-2 flex-wrap w-[100%] h-[20%]">
          {item.Images &&
            urls.map((url, index) => (
              <img
                key={index} // Use index as key (unique for each URL)
                src={url} // Use extracted URL
                alt={`Recipe ${index + 1}`}
                style={{ width: "20%", height: "10%", marginBottom: "20px", aspectRatio:"1" }} // Optional styling
              />
            ))}
        </div>
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
            <strong>Date Published:</strong>
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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../Component/Wrapper";
import axios from "axios";
import InvalidPage from "../Component/InvalidPage";
import ImageSlider from "../Component/ImageSlider";

const RecipeDetails = () => {
  const { recipeName } = useParams();

  // Extract name and ID from the param
  const paramParts = recipeName.split("_") ?? null;
  const id = paramParts.pop() ?? null;

  //Combine the rest as the name
  const itemName = paramParts.join(" ") ?? null;

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Check if id and name is available in the URL
    if (recipeName.includes("_") === false) return;
    if (isNaN(id) || !id || !itemName) return;

    //if everything is right dfetch the data
    const fetchData = async () => {
      try {
        // console.log("Fetching item by ID:", id);
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
        `${import.meta.env.VITE_SERVER_URL}/recipe/filter`,
        {
          name: RecipeName,
          id: RecipeId,
        },
        { withCredentials: true }
      );
      if (response.data.success == false) return response.data;
      return response.data.body[0];
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };
  if (recipeName.includes("_") === false || isNaN(id) || !id || !itemName)
    return <InvalidPage />;
  // if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Loading...</p>;
  if (item.success === false) return <InvalidPage />;
  const regex = /"([^"]+)"/g;
  let matches;
  let urls = [];
  let instructions = [];
  // Loop through all matches
  while ((matches = regex.exec(item.Images)) !== null) {
    urls.push(matches[1]);
  }
  while ((matches = regex.exec(item.RecipeInstructions)) !== null) {
    instructions.push(matches[1]);
  }

  return (
    <Wrapper>
      <div className="flex flex-col justify-center w-[100%]">
        <h1>Recipe Details for: {item.Name}</h1>
        <div className="">
          {
            item.Images && <ImageSlider images={urls} />
            // urls.map((url, index) => (
            //   <img
            //     key={index} // Use index as key (unique for each URL)
            //     src={url} // Use extracted URL
            //     alt={`Recipe ${index + 1}`}
            //     style={{
            //       width: "20%",
            //       height: "10%",
            //       marginBottom: "20px",
            //       aspectRatio: "1",
            //     }} // Optional styling
            //   />
            // ))
          }
        </div>
        <div className="p-4">
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
          <strong>Instructions:</strong>
          <ol>
            {item.RecipeInstructions &&
              instructions.map((inst, index) => (
                <li key={index}>{index + 1 + ")   " + inst}</li>
              ))}
          </ol>
        </div>
      </div>
    </Wrapper>
  );
};
export default RecipeDetails;

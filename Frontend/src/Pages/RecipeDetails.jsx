import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvalidPage from "../Component/InvalidPage";
import React from "react";
import StarRating from "../Component/StarRating";
import Slider from "../Component/Slider";
import { useThemeContext } from "../context/ThemeContext";

const RecipeDetailsPage = () => {
  const { isDarkMode } = useThemeContext();
  const saveAsPdfRef = useRef();

  const handleDownloadPdf = () => {
    const input = saveAsPdfRef.current;
    html2canvas(input, {
      scale: 1.5, // Higher scale for better resolution
      useCORS: true, // Enable cross-origin images
      logging: true, // Enable logging for debugging
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          putOnlyUsedFonts: true,
          compress: false,
          unit: "px",
          format: [canvas.width, canvas.height], // Use canvas dimensions
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${item.Name}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const { recipeName } = useParams();

  // Extract name and ID from the param
  const paramParts = recipeName.split("_") ?? null;
  const id = paramParts.pop() ?? null;

  //Combine the rest as the name
  const itemName = paramParts.join(" ") ?? null;

  const [item, setItem] = useState(null);

  useEffect(() => {
    //Check if id and name is available in the URL
    if (recipeName.includes("_") === false) return;
    if (isNaN(id) || !id || !itemName) return;

    //if everything is right fetch the data
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
  let imageUrls = [];
  let instructions = [];
  let RecipeIngredientParts = [];
  // Loop through all matches
  while ((matches = regex.exec(item.Images)) !== null) {
    imageUrls.push(matches[1]);
  }
  while ((matches = regex.exec(item.RecipeInstructions)) !== null) {
    instructions.push(matches[1]);
  }
  while ((matches = regex.exec(item.RecipeIngredientParts)) !== null) {
    RecipeIngredientParts.push(matches[1]);
  }

  return (
    <div
      className={`max-w-4xl mx-auto p-2 pb-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-[#232323]" : "bg-[#f0f8ff]"
      } `}
    >
      <div ref={saveAsPdfRef} className="p-2 ">
        {/* Recipe Overview */}
        <section className="mb-8">
          <h1 className="text-4xl  below-sm:text-2xl font-bold flex items-center">
            {item.Name}
          </h1>
          <p className="text-xl below-sm:text-[14px] leading-snug mt-2">
            {item.Description}
          </p>
          <p className="mt-4 text-sm ">Category: {item.RecipeCategory}</p>
          <p className="mt-1 text-sm ">
            Date Published: {new Date(item.DatePublished).toLocaleString()}
          </p>
        </section>
        <div className="flex flex-row  flex-wrap gap-2 pl-4 below-sm:pl-0 ">
          <Slider images={imageUrls} interval={3500} />
        </div>

        {/* Time Details */}
        <section className="mb-6 mt-6  ">
          <h2 className="text-2xl  font-semibold flex items-center">
            <span role="img" aria-label="clock">
              ⏱️
            </span>
            Time Details:
          </h2>
          <div className="flex flex-row flex-wrap gap-4 below-sm:gap-0">
            <p className="mt-1 pl-8">Prep Time: {item.PrepTime} minutes</p>
            <p className="mt-1 pl-8">Cook Time: {item.CookTime} minutes</p>
            <p className="mt-1 pl-8">Total Time:{item.TotalTime} minutes</p>
          </div>
        </section>
        <div className="flex flex-row flex-wrap gap-10 below-sm:gap-4">
          {/* Ingredients */}
          <section className="mb-5">
            <h2 className="text-2xl font-semibold flex items-center">
              <span role="img" aria-label="spoon">
                🥄
              </span>
              Ingredients Used:
            </h2>
            <ul className="list-disc list-inside mt-1 space-y-1 pl-8">
              {RecipeIngredientParts.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          {/* Nutritional Information */}
          <section className="mb-5 pl-2">
            <h2 className="text-2xl  font-semibold flex items-center">
              <span role="img" aria-label="plate">
                🍽️
              </span>
              Nutritional Information:
            </h2>
            <p className="mt-1 pl-8">Calories: {item.Calories}</p>
            <p className="mt-1 pl-8">Fat Content: {item.FatContent} g</p>
            <p className="mt-1 pl-8">
              Saturated Fat: {item.SaturatedFatContent} g
            </p>
            <p className="mt-1 pl-8">
              Cholesterol: {item.CholesterolContent} mg
            </p>
            <p className="mt-1 pl-8">Sodium:{item.SodiumContent} mg</p>
            <p className="mt-1 pl-8">
              Carbohydrates: {item.CarbohydrateContent} g
            </p>
            <p className="mt-1 pl-8">Fiber: {item.FiberContent} g</p>
            <p className="mt-1 pl-8">Sugar: {item.SugarContent} g</p>
            <p className="mt-1 pl-8">Protein: {item.ProteinContent} g</p>
          </section>
        </div>

        {/* Instructions */}
        <section className="mb-4">
          <h2 className="text-2xl  font-semibold flex items-center">
            <span role="img" aria-label="clipboard">
              📋
            </span>
            Cooking Guidelines:
          </h2>
          <ol className="list-decimal mt-1 list-outside pl-10 leading-6  space-y-1">
            {instructions.map((instruction, index) => (
              <li key={index} className="">
                {instruction}
              </li>
            ))}
          </ol>
        </section>
      </div>
      {/* Share Buttons and Ratings */}
      <div className="flex justify-between items-center mt-6">
        {/* Share Buttons */}
        <div className="flex space-x-2">
          <button className="bg-blue-300 py-1 px-3 rounded hover:bg-blue-500">
            Share
          </button>
          <button
            className="bg-gray-400  py-1 px-3 rounded hover:bg-gray-300"
            onClick={handleDownloadPdf}
          >
            Download
          </button>
        </div>

        {/* Ratings and Reviews */}
        <StarRating />
      </div>
    </div>
  );
};

export default RecipeDetailsPage;

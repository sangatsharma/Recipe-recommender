import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchItemById } from "../utils/auth";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvalidPage from "../Component/InvalidPage";
import React from "react";
import StarRating from "../Component/StarRating";
import Slider from "../Component/Slider";
import { useThemeContext } from "../context/ThemeContext";
import logo from "../assets/Images/Logo_SVG.svg";
import ShareDropdown from "../Component/ShareDropdown";
import { TfiDownload } from "react-icons/tfi";

const RecipeDetailsPage = () => {
  const { isDarkMode } = useThemeContext();
  const saveAsPdfRef = useRef();

  const DownloadPdf = () => {
    const input = saveAsPdfRef.current;
    html2canvas(input, {
      scale: 1.5, // Higher scale for better resolution
      useCORS: true, // Enable cross-origin images
      logging: true, // Enable logging for debugging
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          scale: 1.5, // Higher scale for better resolution
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
  const handleDownloadPdf = () => {
    setShowWaterMark(true);
    setTimeout(() => {
      DownloadPdf();
      setShowWaterMark(false);
    }, 1000);
  };

  const { recipeName } = useParams();
  console.log("Recipe Name:", recipeName);

  // Extract name and ID from the param
  const paramParts = recipeName.split("_") ?? null;
  const id = paramParts.pop() ?? null;

  //Combine the rest as the name
  const itemName = paramParts.join(" ") ?? null;

  const [item, setItem] = useState(null);
  const [showWaterMark, setShowWaterMark] = useState(false);

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
  let tags = [];

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
  while ((matches = regex.exec(item.Keywords)) !== null) {
    tags.push(matches[1]);
  }

  return (
    <div className="max-w-4xl mx-auto pb-6 rounded-lg shadow-lg ">
      <div
        className={`${
          isDarkMode ? "bg-[#232323]" : "bg-[#f0f8ff]"
        } p-6 below-sm:p-2  relative`}
        ref={saveAsPdfRef}
      >
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
        <div className="m-auto">
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

        {/* WaterMark */}
        <div
          className={`absolute  w-[95%] flex justify-center m-auto ${
            showWaterMark ? "opacity-10" : "opacity-0"
          } `}
        >
          <img src={logo} className="h-[450px] w-[450px]" />
        </div>
        <div className="flex flex-row flex-wrap gap-10 below-sm:gap-4 relative">

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
      <div className="pl-8 below-sm:pl-8 ">
        {/* Ratings and Reviews */}
        <StarRating />

        {/* Share Buttons */}
        <div className="flex  items-center space-x-2 mt-4">
          <ShareDropdown  url={`https://recipe-recommender-five.vercel.app/recipes/${recipeName}` } title={item.Name} text={item.Description} image={imageUrls[0]}   hashtags={[...tags]} />
          <button
            className="bg-green-500 py-2 px-3  rounded  hover:bg-green-700"
            onClick={handleDownloadPdf}
          >
            Download
            <i className="fas fa-download pl-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;

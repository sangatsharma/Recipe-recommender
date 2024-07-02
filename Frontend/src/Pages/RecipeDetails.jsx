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
import logo from "../assets/Images/logoOrange.png";
import { Helmet } from "react-helmet-async";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const RecipeDetails = () => {
  const { isDarkMode } = useThemeContext();
  const saveAsPdfRef = useRef();

  const DownloadPdf = () => {
    const input = saveAsPdfRef.current;
    html2canvas(input, {
      scale: 2, // Higher scale for better resolution
      useCORS: true, // Enable cross-origin images
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          putOnlyUsedFonts: true,
          compress: false,
          floatPrecision: 1,
          unit: "px",
          format: [canvas.width + 5, canvas.height + 5], // Use canvas dimensions
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
  // share using native share
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Checkout this amazing recipe: ${itemName} from Cook It Yourself.`,
          text: `A very tasty recipe: ${itemName} from Cook It Yourself.`,
          url: `https://recipe-recommender-five.vercel.app/recipes/${recipeName}`,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };
  const encodedUrl = encodeURIComponent(
    `https://recipe-recommender-five.vercel.app/recipes/${recipeName}`
  );
  const encodedText = encodeURIComponent(
    `Checkout this amazing recipe: ${item.Name} from Cook It Yourself.`
  );
  const encodedHashtags = encodeURIComponent(
    "cookityourself,tastyrecipe,healthyfood,cooking"
  );

  return (
    <div className="max-w-4xl mx-auto pb-6 rounded-lg shadow-lg ">
      {/* Open Graph tags */}
      <Helmet>
        <meta
          property="og:title"
          content={`Checkout this amazing recipe: ${itemName} from Cook It Yourself.`}
        />
        <meta
          property="og:description"
          content={`A tasty recipe: ${itemName} from Cook It Yourself.`}
        />
        <meta
          property="og:image"
          content={
            imageUrls[0] ||
            "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/87/24/2/55UGsokzSNSNl11QP510_Fish%20Poleko.jpg"
          }
        />
        <meta
          property="og:url"
          content={`https://recipe-recommender-five.vercel.app/recipes/${recipeName}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Checkout this amazing recipe: ${itemName}, from Cook It Yourself.`}
        />
        <meta
          name="twitter:description"
          content={`Checkout this amazing recipe: ${itemName}, from Cook It Yourself.`}
        />
        <meta
          name="twitter:image"
          content={
            imageUrls[0] ||
            "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/87/24/2/55UGsokzSNSNl11QP510_Fish%20Poleko.jpg"
          }
        />
      </Helmet>

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
          className={`absolute  w-[95%] flex justify-center items-center m-auto ${
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
        <div className="mb-4">
          <h2 className="text-2xl  font-semibold flex items-center">
            <span role="img" aria-label="clipboard">
              📋
            </span>
            Cooking Guidelines:
          </h2>
          <ol className="list-decimal mt-1 list-outside  pl-10 ">
            {instructions.map((instruction, index) => (
              <li key={index} className="leading-5 mt-1 ">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Share Buttons and Ratings */}
      <div className="px-8 flex-col gap-2 justify-between below-sm:pl-8 ">
        <div className="items-center space-x-2 mb-4">
          <StarRating />
        </div>
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="mt-2  flex flex-row gap-3">
            {/* Native Share */}
            <button
              className=" bg-blue-500 py-2 px-3  rounded  hover:bg-blue-700 hover:text-white"
              aria-label="Share via Native Share"
              onClick={handleNativeShare}
            >
              Share
              <i className="fas fa-share "></i>
            </button>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:border-blue-500 hover:border-b-2 rounded "
              aria-label="Share on Facebook"
            >
              <FaFacebook className=" text-blue-500" size={30} />
            </a>
            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedHashtags}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center   hover:border-gray-500 hover:border-b-2 rounded "
              aria-label="Share on Twitter"
            >
              <FaSquareXTwitter size={30} />
            </a>
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center   hover:border-[#4ac958] hover:border-b-2 rounded"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp className="pl-2 text-[#4ac958]" size={30} />
            </a>
          </div>
          <div>
            <button
              className="bg-green-500 py-2 px-3  rounded  hover:bg-green-700  hover:text-white"
              onClick={handleDownloadPdf}
            >
              Download
              <i className="fas fa-download pl-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

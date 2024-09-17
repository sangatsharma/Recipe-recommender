import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
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
import Skeleton from "../Component/Loader/Skeleton";
import AddToFav from "../Component/AddToFav";
import { useFavContext } from "../context/FavContext";
import { AuthContext } from "../context/AuthContext";
import PeopleCard from "../Component/PeopleCard";
import Spinner from "../Component/Loader/Spinner";
import { fetchUserById } from "../utils/auth";
import { toast } from "react-toastify";
import axios from "axios";
import RecipeOptions from "../Component/RecipeOptions";

const RecipeDetails = () => {
  const { isDarkMode } = useThemeContext();
  const { userInfo, isAuthenticated } = useContext(AuthContext);
  const saveAsPdfRef = useRef();
  const { tickedItems, toggleTick } = useFavContext();

  const [comments, setComments] = useState([]); // Dummy comment
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  //using location state to extract ingredients if page was redirected from search by ingredients
  const location = useLocation();
  const navigate = useNavigate();
  const matchedIngredients = location.state?.matchedIngredients || [];

  //for scrolling to comment if redirected from notifications
  const userId = location.state?.commentId || null;
  const commentRefs = useRef({});

  const [downloading, setDownloading] = useState(false);

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
          compress: true,
          floatPrecision: 1,
          unit: "px",
          format: [canvas.width, canvas.height], // Use canvas dimensions
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${item.Name}.pdf`);
        setDownloading(false);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  const handleDownloadPdf = () => {
    setShowWaterMark(true);
    setDownloading(true);
    setTimeout(() => {
      DownloadPdf();
      setShowWaterMark(false);
    }, 1000);
  };

  const { recipeName } = useParams();
  // Extract name and ID from the param
  const paramParts = recipeName.split("_") ?? null;
  const id = paramParts.pop() ?? null;

  //Combine the rest as the name
  const itemName = paramParts.join(" ") ?? null;

  const [item, setItem] = useState(null);
  const [showWaterMark, setShowWaterMark] = useState(false);
  const [author, setAuthor] = useState({});

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
        const authorDetails = await fetchUserById(fetchedItem.AuthorId);
        if (authorDetails.success) setAuthor(authorDetails.body);

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/recipe/review/${id}`,
          { withCredentials: true }
        );
        setComments(response.data.body);
        if (userId && commentRefs.current[userId]) {
          setTimeout(() => {
            commentRefs.current[userId].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100); // Adjust the delay as needed
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [recipeName, userId]);

  // Handle comment submission
  const submitComment = async () => {
    if (newComment.trim() === "" || newRating === 0) {
      toast.error("Please enter a comment and rating.");
      return;
    }
    if (!isAuthenticated) {
      toast.error("Login to add review.");
      return;
    }
    console.log("Submitting comment:", newComment, newRating);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/recipe/review/add`,
        { recipeId: id, review: newComment, rating: newRating },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.success) {
        toast.success("Review added successfully.");
        setComments((prev) => [
          ...prev,
          { ...data.body[0], userName: userInfo.name },
        ]);
        setNewComment("");
        setNewRating(0);
      }
    } catch (error) {
      console.error("Error adding new comment:", error);
      toast.error("Failed to add review.");
    }
  };

  //Handle comment deletion
  const handleCommentDelete = async (commentId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/recipe/review/remove`,
        { id: commentId },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      if (data.success) {
        toast.success("Review deleted successfully.");
        setComments((prev) =>
          prev.filter((comment) => comment.reviewId !== commentId)
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete review.");
    }
  };

  if (recipeName.includes("_") === false || isNaN(id) || !id || !itemName)
    return <InvalidPage />;
  // if (error) return <p>Error: {error}</p>;
  if (!item) return <Skeleton />;
  if (item.success === false) return <InvalidPage />;

  // share using native share
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Checkout this amazing recipe: ${item.Name} from Cook It Yourself.`,
          text: `A very tasty recipe: ${item.Name} from Cook It Yourself.`,
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
        <title>CIY-{item.Name}</title>

        <meta
          property="og:title"
          content={`Checkout this amazing recipe: ${item.Name} from Cook It Yourself.`}
        />
        <meta
          property="og:description"
          content={`Checkout this amazing recipe: ${item.Name} from Cook It Yourself.`}
        />
        <meta property="og:image" content={item.Images[0]} />
        <meta
          property="og:url"
          content={`https://recipe-recommender-five.vercel.app/recipes/${recipeName}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Checkout this amazing recipe: ${item.Name}, from Cook It Yourself.`}
        />
        <meta
          name="twitter:description"
          content={`Checkout this amazing recipe: ${item.Name}, from Cook It Yourself.`}
        />
        <meta name="twitter:image" content={item.Images[0]} />
      </Helmet>

      <div
        className={`${
          isDarkMode ? "bg-[#232323]" : "bg-[#f0f8ff]"
        } px-6 py-4 below-sm:p-2  relative`}
        ref={saveAsPdfRef}
      >
        {/* Recipe Overview */}
        <section className="mb-8">
          <h1 className="text-4xl mb-1  below-sm:text-2xl font-bold">
            {item.Name}
          </h1>
          <div className="flex flex-row justify-between items-start mr-4 mb-2">
            <p className="pl-2">
              Submitted by{" "}
              <span
                onClick={() => {
                  const path = author.name.split(" ")[0] + "_" + author.id;
                  navigate(`/profile/${path}`, { state: author });
                }}
                className="text-blue-400 cursor-pointer"
              >
                {author.name}
              </span>
            </p>
            <div className="flex flex-row gap-2 h-8 ">
              <AddToFav
                id={id}
                toggleTick={toggleTick}
                isFavorite={tickedItems.has(item.RecipeId)}
              />
              <RecipeOptions
                isMyRecipe={userInfo.posts.includes(item.RecipeId)}
              />
            </div>
          </div>
          <p className="text-xl below-sm:text-sm pl-3">"{item.Description}"</p>
          <p className="mt-2 text-sm pl-2 ">Category: {item.RecipeCategory}</p>
          <p className="mt-1 text-sm pl-2">
            Date Published: {new Date(item.DatePublished).toLocaleString()}
          </p>
        </section>
        <div className="m-auto">
          <Slider images={item.Images} interval={3500} />
        </div>

        {/* Time Details */}
        <section className="mb-6 mt-6  ">
          <h2 className="text-2xl  font-semibold flex items-center ">
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
          {/* Ingredients to buy */}
          {matchedIngredients.length > 0 && (
            <section className="mb-5">
              <h2 className="text-2xl font-semibold flex items-center">
                <span role="img" aria-label="spoon">
                  🥄
                </span>
                Ingredients to Buy :
              </h2>
              <ul className="list-disc list-inside mt-1 space-y-1 pl-8">
                {item.RecipeIngredientParts.map((ingredient, index) =>
                  !matchedIngredients.includes(ingredient) ? (
                    <li key={index}>{ingredient}</li>
                  ) : null
                )}
              </ul>
            </section>
          )}
          {/* Ingredients */}

          {matchedIngredients.length > 0 ? (
            <section className="mb-5">
              <h2 className="text-2xl font-semibold flex items-center">
                <span role="img" aria-label="spoon">
                  🥄
                </span>
                Ingredients you have :
              </h2>
              <ul className="list-disc list-inside mt-1 space-y-1 pl-8">
                {item.RecipeIngredientParts.map((ingredient, index) =>
                  matchedIngredients.includes(ingredient) ? (
                    <li key={index}>{ingredient}</li>
                  ) : null
                )}
              </ul>
            </section>
          ) : (
            <section className="mb-5">
              <h2 className="text-2xl font-semibold flex items-center">
                <span role="img" aria-label="spoon">
                  🥄
                </span>
                Ingredients Used:
              </h2>
              <ul className="list-disc list-inside mt-1 space-y-1 pl-8">
                {item.RecipeIngredientParts.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>
          )}

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
            {item.RecipeInstructions.map((instruction, index) => (
              <li key={index} className="leading-6 mt-2 ">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Share Buttons and Ratings */}
      <div className="px-8 flex-col gap-2 justify-between below-sm:pl-8 ">
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="mt-2  flex flex-row gap-3">
            {/* Native Share */}
            <button
              className=" bg-blue-500 py-2 px-3  rounded  hover:bg-blue-700 hover:text-white"
              aria-label="Share via Native Share"
              onClick={handleNativeShare}
            >
              Share
              <i className="fas fa-share pl-2"></i>
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
              {downloading ? (
                <span className="flex flex-row  justify-center items-center gap-2">
                  <Spinner /> Downloading{" "}
                </span>
              ) : (
                <>
                  {" "}
                  <i className="fas fa-download pl-2"></i> Download{" "}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="px-8 mt-3  flex flex-col below-sm:pl-8 ">
        <p className="text-xl mb-1">Recipe by:</p>
        <PeopleCard userDetails={author} />
      </div>

      <div className="p-6 below-sm:p-2">
        {/* Comment Form */}
        <div className="mb-6 border-2 rounded-md p-2">
          <div className="items-center space-x-2 mb-2">
            <h2 className="text-xl font-semibold mb-2 below-sm:text-md">
              We Value Your Feedback!
            </h2>
            <p className="mb-1 text-sm">
              Thank you for trying our recipe. We'd love to hear your thoughts
              on it. Your feedback helps us improve and provide better recipes
              for you.
            </p>
            <div className="flex flex-row gap-2 ">
              <p>Please rate this recipe:</p>
              <StarRating
                onRating={(x) => {
                  console.log("rating: ", x);
                  setNewRating(x);
                }}
              />
            </div>
          </div>
          <textarea
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your review here"
          />
          {/* Rating input (can use stars or select dropdown) */}

          <button
            onClick={submitComment}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>

        {/* Display Existing Comments */}
        <div className=" pt-4">
          <h3 className="text-xl font-semibold mb-2">
            Reviews:({comments.length})
          </h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-200"
                ref={(el) => (commentRefs.current[comment.userId] = el)}
              >
                <div className="flex flex-row justify-between">
                  <section className="flex flex-row flex-wrap gap-2">
                    <p className="font-medium ">
                      <strong
                        className="text-xl below-sm:text-sm cursor-pointer hover:underline"
                        onClick={() => {
                          navigate(
                            `/profile/${comment.userName?.split(" ")[0]}_${
                              comment.userId
                            }`
                          );
                        }}
                      >
                        {comment.userName}:
                      </strong>
                    </p>
                    <StarRating value={comment.rating} isDisabled />
                  </section>
                  {comment.userName === userInfo.name && (
                    <i
                      onClick={() => {
                        handleCommentDelete(comment.reviewId);
                      }}
                      title={"Delete comment."}
                      className="fa-solid fa-trash text-red-500 cursor-pointer hover:scale-125 transition-all"
                    ></i>
                  )}
                </div>
                <p className=" text-sm pl-3 pt-2">"{comment.review}"</p>
                {/* <p className="text-xs text-gray-400">
                  {new Date(comment.timestamp).toLocaleString()}
                </p> */}
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to leave a review!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

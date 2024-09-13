// PostCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const PostCard = ({
  darkMode,
  user = {
    name: "Sangat Sharma",
    id: 12,
    profile_pic:
      "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png",
  },
  recipeDetails = {
    RecipeId: 1,
    Name: "Vegan and gluten free chocolate chip cookies",
    Description:
      "I spent the last 3 years perfecting the vegan and gluten free chocolate chip cookie recipe. I am so excited to share it with you all!",
    Images: [
      "https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg",
    ],
    AggregatedRating: 4,
  },
}) => {
  
  const navigate = useNavigate();
  const itemName =
    recipeDetails.Name.replace(/\s/g, "_") + `_${recipeDetails.RecipeId}`;
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }  below-sm:w-[100%] cursor-pointer`}
      onClick={() => {
        navigate(`/recipes/${itemName}`);
      }}
    >
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={
            user.profile_pic ||
            "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
          }
          alt="Avatar"
        />
        <div>
          <div className="font-bold text-lg">{user.name}</div>
          <div className="text-sm text-gray-500">
            @{user.name?.split(" ")[0] + user.id}
          </div>
        </div>
      </div>
      <div className="w-[100%]">
        <h2 className="text-2xl font-bold mb-2">{recipeDetails.Name}</h2>
        <p className="mb-4">{recipeDetails.Description}</p>
      </div>
      <img
        className="rounded-lg mb-4 w-full h-[500px] m-auto"
        src={recipeDetails.Images[0]}
        alt="Cookies"
      />
      {/* <div className="flex justify-between text-sm text-gray-500">
        <StarRating />
      </div> */}
    </div>
  );
};

export default PostCard;

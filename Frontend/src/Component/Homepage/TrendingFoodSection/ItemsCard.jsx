import "./ItemsCard.css";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../context/ThemeContext";
import { useState } from "react";

const ItemsCard = ({
  id,
  src,
  name,
  rating,
  cooktime,
  isFavorite,
  toggleTick,
  RecipeCategory,
}) => {
  const { isDarkMode } = useThemeContext();
  const [isScaling, setIsScaling] = useState(false);
  const navigate = useNavigate();

  // Create a URL-friendly name
  //todo check with double space after building the post page.
  const itemName = name.replace(/\s/g, "_") + `_${id}`;

  //navigate to the recipe details page
  const handleClick = () => {
    navigate(`/recipes/${itemName}`, { state: { id, src, name, rating } });
  };

  const fallbackSrc =
    "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";

  function isValidImageUrl(url) {
    // Define regular expression for image URL
    const regex = /\.(jpeg|jpg|gif|png|svg)$/i;
    if (url === null || url === undefined) return false;
    // Test if the URL matches the regex pattern
    return regex.test(url);
  }

  return (
    <div
      className={`ItemsCard ${isDarkMode ? "ItemsCard-dark-mode" : ""} group`}
    >
      <div className="ImageContainer">
        <img
          loading="lazy"
          src={isValidImageUrl(src) ? src : fallbackSrc}
          alt={name}
          onClick={handleClick}
        />
        <button
          className={`absolute top-4 right-4 text-1xl pt-1 px-2 rounded-[50%] transition-ease-in-out 
                            ${
                              isFavorite
                                ? "text-red-500 bg-gray-200 opacity-100"
                                : "text-gray-500 bg-gray-200 opacity-0"
                            }
                             group-hover:opacity-100 hover:shadow-lg hover:scale-110 focus:outline-none`}
          onClick={() => {
            setIsScaling(true);
            setTimeout(() => {
              setIsScaling(false);
            }, 200);
            toggleTick(id);
          }}
        >
          {isFavorite ? (
            <i
              className={`fas fa-heart ${
                isScaling
                  ? "transform scale-150 transition-transform duration-200"
                  : "transition-transform duration-200"
              }`}
            ></i>
          ) : (
            <i
              className={` ${
                isScaling
                  ? "transform scale-0 transition-transform duration-100"
                  : "transition-transform duration-200"
              } far fa-heart`}
            ></i>
          )}
        </button>
      </div>
      <div className="RecipeInfo" onClick={handleClick} title={name}>
        <div className="RecipeName">
          <p id="RecipeName">{name}</p>
        </div>
        <div className="flex flex-row justify-between w-[100%]">
          <div className="flex flex-row gap-1 items-center">
            <p className="cooktime inline">
              <i className="fas fa-clock pr-2"></i>
              {cooktime} min,
            </p>
            <p id="RecipeRating">{rating || 4.6} </p>
            <i className="fas fa-star text-[12px] text-[#e68338]"></i>
          </div>
          <div className="w-auto">
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              } text-[14px] `}
            >
              {RecipeCategory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemsCard;

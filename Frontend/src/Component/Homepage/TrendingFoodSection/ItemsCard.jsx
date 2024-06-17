import "./ItemsCard.css";
import { useNavigate } from "react-router-dom";

const ItemsCard = ({ id, src, name, rating }) => {
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
    <div className="ItemsCard" onClick={handleClick}>
      <div className="ImageContainer">
        <img
          loading="lazy"
          src={isValidImageUrl(src) ? src : fallbackSrc}
          alt={name}
        />
      </div>
      <div className="RecipeInfo">
        <p id="RecipeName">{name}</p>
        <p id="RecipeRating">{rating || 4.6} ratings</p>
      </div>
    </div>
  );
};
export default ItemsCard;

import "./ItemsCard.css";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const ItemsCard = ({ id, src, name, rating }) => {
  const navigate = useNavigate();

  // Create a URL-friendly name
  const itemName = `${slugify(name, {
    replacement: "_",
  })}_${id}`;
  const handleClick = () => {
    navigate(`/recipes/${itemName}`, { state: { id, src, name, rating } });
  };

  return (
    <div className="ItemsCard" onClick={handleClick}>
      <div className="ImageContainer">
        <img loading="lazy" src={src} alt={name} />
      </div>
      <div className="RecipeInfo">
        <h3 id="RecipeName">{name}</h3>
        <p id="RecipeRating">{rating} ratings</p>
      </div>
    </div>
  );
};
export default ItemsCard;

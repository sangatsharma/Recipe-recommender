import "./ItemsCard.css";
import { useNavigate } from "react-router-dom";

const ItemsCard = ({ id, src, name, rating }) => {
  const navigate = useNavigate();

  // Create a URL-friendly name
  //todo check with double space after building the post page.
  const itemName = name.replace(/\s+/g, "_") + `_${id}`;
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

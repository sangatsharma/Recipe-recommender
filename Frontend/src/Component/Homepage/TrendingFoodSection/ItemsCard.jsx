import "./ItemsCard.css";
const ItemsCard = (props) => {
  return (
    <div className="ItemsCard">
      <div className="ImageContainer">
        <img loading="lazy" src={props.src} alt={props.name} />
      </div>
      <div className="RecipeInfo">
        <h3 id="RecipeName">{props.name}</h3>
        <p id="RecipeRating">{props.rating} ratings</p>
      </div>
    </div>
  );
};
export default ItemsCard;

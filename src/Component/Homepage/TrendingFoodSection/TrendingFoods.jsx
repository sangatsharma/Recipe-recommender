import "./TrendingFoods.css";
import ItemsCard from "./ItemsCard.jsx"
const TrendingFoods = (props) => {
  return (
    <div className="TrendingFood">
      <h2>Popular this week</h2>
      <div className="ItemsWrapper">
        {props.items.map((item) => {
          return (
            <ItemsCard id={item.id} src={item.src} name={item.name} rating={item.rating} ></ItemsCard>
          );
        })}
      </div>
    </div>
  );
};
export default TrendingFoods;



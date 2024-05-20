
import './Banner.css'
const Banner = (props) => {
  return (
    <>
    <div className="Banner">
      <div className="BannerTitleWrapper">
        <h1 id="Title">Welcome to Cooking Club</h1>
        <p id="SubTitle">
          A community of cooks, food lovers, and recipe enthusiasts.
        </p>
      </div>
      <div className="SearchBar">
       
        <input
          type="text"
          placeholder="Find recipes, ingredients, or dishes"
          aria-label="Find recipes, ingredients, or dishes"
        />
        <button type="button">Search</button>
      </div>
    </div>
    {props.content}
   </>
  );
};
export default Banner;
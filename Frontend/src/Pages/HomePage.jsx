import Banner from "../Component/Homepage/Banner/Banner.jsx";
import TrendingFoods from "../Component/Homepage/TrendingFoodSection/TrendingFoods.jsx";
import { popularItems } from "../sampleObject.js";

const Homepage = () => {
  return (
    <>
      <Banner />
      <TrendingFoods items={popularItems} />
    </>
  );
};
export default Homepage;

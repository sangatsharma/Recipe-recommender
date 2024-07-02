import Slider from "../Component/Slider.jsx";
import TrendingFoods from "../Component/Homepage/TrendingFoodSection/TrendingFoods.jsx";
import banner1 from '../assets/Images/banner1.jpg';
import banner2 from '../assets/Images/banner2.jpg';
import banner3 from '../assets/Images/banner3.jpg';
import { Helmet } from "react-helmet";

const Homepage = () => {
  <Helmet>
  <title>Home - CIY </title>
  </Helmet>
  const images = [
    "https://img.freepik.com/premium-photo/collage-food-dishes-meat-fish-vegetables_187166-47028.jpg?w=1380",
    banner1,
    banner2,
    banner3
  ];
  return (
    <>
      {/* <Banner /> */}
      <Slider images={images} />
      <TrendingFoods />
    </>
  );
};
export default Homepage;

import Slider from "../Component/Slider.jsx";
import TrendingFoods from "../Component/Homepage/TrendingFoodSection/TrendingFoods.jsx";
import banner1 from "../assets/Images/banner1.jpg";
import banner2 from "../assets/Images/banner2.jpg";
import banner3 from "../assets/Images/banner3.jpg";
import { Helmet } from "react-helmet-async";

const Homepage = () => {
  const images = [
    {
      title: "Welcome to Cook It Yourself",
      src: "https://img.freepik.com/premium-photo/collage-food-dishes-meat-fish-vegetables_187166-47028.jpg?w=1380",
    },
    { title: "Seasonal Foods", src: banner1 },
    { title: "Trending Recipes", src: banner2 },
    { title: "Popular Recipes", src: banner3 },
  ];
  return (
    <>
      <Helmet>
        <title>Home - CIY </title>
      </Helmet>
      {/* <Banner /> */}
      <Slider images={images} />
      <TrendingFoods />
    </>
  );
};
export default Homepage;

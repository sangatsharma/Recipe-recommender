import PostCard from "../Component/PostCard";
import { useThemeContext } from "../context/ThemeContext";
import { Helmet } from "react-helmet-async";

const Explore = (props) => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="flex flex-col gap-2  items-center sm:w-[100%] md:w-[100%] below-sm:w-full xl:w-[48%]">
      <Helmet>
        <title>Explore-CIY </title>
      </Helmet>
      <PostCard darkMode={isDarkMode} />
      <PostCard darkMode={isDarkMode} />
    </div>
  );
};
export default Explore;

import PostCard from "../Component/PostCard";
import { useThemeContext } from "../context/ThemeContext";

const Explore = (props) => {
  const { isDarkMode } = useThemeContext();
  return<div className="flex flex-col gap-2  items-center w-[100%]">
  <PostCard darkMode={isDarkMode} />
  <PostCard darkMode={isDarkMode} />
  
  </div>
};
export default Explore;

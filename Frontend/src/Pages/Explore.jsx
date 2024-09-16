import PostCard from "../Component/PostCard";
import { useThemeContext } from "../context/ThemeContext";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Component/Loader/Spinner";
import { fetchUserById } from "../utils/auth";

const Explore = (props) => {
  const { isDarkMode } = useThemeContext();
  const [exploreItems, setExploreItems] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipe/explore`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = response.data.body.data;
        data.forEach(async (item) => {
          if (item.AuthorId in userDetails) {
            return;
          }
          const user = await fetchUserById(item.AuthorId);
          setUserDetails((prev) => {
            return { ...prev, [item.AuthorId]: user.body };
          });
        });
        setExploreItems(data);
        setRenderRecipes(data.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };
  const loadMoreHandler = () => {
    const newRecipes = exploreItems.slice(0, renderRecipes.length + 4);
    setRenderRecipes(newRecipes);
  };

  return (
    <div className="flex flex-col gap-2  items-center sm:w-[100%] md:w-[100%] below-sm:w-full xl:w-[48%]">
      <Helmet>
        <title>Explore-CIY </title>
      </Helmet>
      {renderRecipes.length > 0 &&
        renderRecipes.map((item, index) => (
          <PostCard
            darkMode={isDarkMode}
            recipeDetails={item}
            key={index}
            user={userDetails[item.AuthorId]}
          />
        ))}
      <button
        className=" bg-blue-700 hover:bg-blue-600 py-2 px-4 mt-4 mb-2 rounded-md text-white"
        onClick={loadMoreHandler}
      >
        <span className="flex flex-row w-auto justify-center gap-2 ">
          <p>Load more</p>
          <span className="">
            <Spinner />
          </span>
        </span>
      </button>
    </div>
  );
};
export default Explore;

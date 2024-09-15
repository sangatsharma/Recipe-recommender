import { useThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "../../Component/Loader/Skeleton";
import PostCard from "../../Component/PostCard";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchUserById } from "../../utils/auth";
import PeopleCard from "../../Component/PeopleCard";
import axios from "axios";

const Profile = () => {
  const { isDarkMode } = useThemeContext();
  const { userInfo, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [PostItem, setPostItem] = useState([]);

  const [currentUser, setCurrentUser] = useState();
  const location = useLocation();
  const author = location.state;
  const path = userInfo.name.split(" ")[0] + "_" + userInfo.id;

  const navigate = useNavigate();
  const { user } = useParams();

  useEffect(() => {
    if (author) {
      fetchItems(author.posts);
      setCurrentUser(author);
    } else if (!loading) {
      if (user == undefined) {
        navigate(`/profile/${path}`);
      } else {
        if (user == userInfo.name.split(" ")[0] + "_" + userInfo.id) {
          fetchItems(userInfo.posts);
          setCurrentUser(userInfo);
        } else {
          // fetch user data using user id
          fetchUserdata();
        }
      }
    }
  }, [user, loading]);

  const fetchItems = async (arrayOfId) => {
    // if(arrayOfId == undefined || arrayOfId.length==0) return;
    console.log("ids:", arrayOfId);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipe`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      const items = data.filter((item) => arrayOfId.includes(item.RecipeId));
      setPostItem(items);
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  };

  const fetchUserdata = async () => {
    const userId = user.split("_")[1];
    const data = await fetchUserById(userId);
    if (data.success) {
      const userName = data.body.name.split(" ")[0] + "_" + data.body.id;
      if (userName != user) {
        setCurrentUser(undefined);
      } else {
        fetchItems(data.body.posts);
        setCurrentUser(data.body);
      }
    } else {
      setCurrentUser(undefined);
    }
  };

  if (loading) {
    return <Skeleton />;
  }
  if (currentUser == undefined)
    return (
      <>
        <div>User not found</div>
        <Skeleton />
      </>
    );
  if (currentUser != undefined)
    return (
      <div className="w-[80%] below-sm:w-full below-sm:p-2 mx-auto p-4   flex-col ">
        <Helmet>
          <title>Profile - CIY </title>
        </Helmet>
        {/* Profile Header */}
        <PeopleCard userDetails={currentUser} profilePage={true} />

        {/* Stats */}
        <div className="flex space-x-8 mb-8">
          <div className="text-center">
            <span className="block text-xl font-bold">
              {currentUser.posts.length}
            </span>
            <span className="text-gray-500">Posts</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">
              {currentUser.followers?.length}
            </span>
            <span className="text-gray-500">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">
              {currentUser.following?.length}
            </span>
            <span className="text-gray-500">Following</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8">
          <section className="flex space-x-8 text-xl below-sm:text-sm p-2 overflow-x-scroll hide-scrollbar scroll-smooth">
            {["Posts", "Followers", "Following", "Activity", "About"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-2 ${
                    activeTab === tab.toLowerCase()
                      ? "border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </section>
        </div>

        {/* Content */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full">
            {PostItem.map((_, index) => (
              <PostCard key={index} darkMode={isDarkMode} user={currentUser} recipeDetails={PostItem[index]} />
            ))}
          </div>
        )}

        {activeTab === "followers" && (
          <div className="text-center text-gray-500">
            {/* Replace with actual follower data */}
            <p>No followers yet.</p>
          </div>
        )}

        {activeTab === "following" && (
          <div className="text-center text-gray-500">
            {/* Replace with actual following data */}
            <p>No following yet.</p>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            {/* Replace with actual activity data */}
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/40" // Replace with actual user image
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p>Liked by @jameswilliams</p>
                  <span className="text-gray-500 text-sm ml-auto">2w</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="text-center text-gray-500">
            <p>About section content goes here.</p>
          </div>
        )}
      </div>
    );
};

export default Profile;

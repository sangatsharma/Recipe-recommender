import { useThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "../../Component/Loader/Skeleton";
import PostCard from "../../Component/PostCard";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { isDarkMode } = useThemeContext();
  const { userInfo, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("posts");
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();
  const { user } = useParams();

  console.log(user);

  useEffect(() => {
    if (!loading) {
      if (user == undefined) {
        const path = userInfo.name.split(" ")[0] + "_" + userInfo.id;
        navigate(`/profile/${path}`);
      } else {
        if (user == userInfo.name.split(" ")[0] + "_" + userInfo.id)
          setCurrentUser(userInfo);
        else {
          //todo: fetch user data using user id
          // Replace with actual user data
          // setCurrentUser({});
        }
      }
    }
  }, [user, loading]);

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
      <div className="w-[80%] below-sm:w-full below-sm:p-2 mx-auto p-8  flex-col ">
        <Helmet>
          <title>Profile - CIY </title>
        </Helmet>
        {/* Profile Header */}
        <div className="flex items-center space-x-3 mb-8 ">
          <img
            src={
              currentUser.profile_pic ||
              "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl below-sm:text-[1rem] font-bold">
              {currentUser.name}
            </h1>
            <p className="text-gray-500">{`@${currentUser.name.split(" ")[0]}${
              currentUser.id
            }`}</p>
          </div>
          <div className="">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">
              Follow
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-8 mb-8">
          <div className="text-center">
            <span className="block text-xl font-bold">{currentUser.posts}</span>
            <span className="text-gray-500">Posts</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">
              {currentUser.followers.length}
            </span>
            <span className="text-gray-500">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-xl font-bold">
              {currentUser.following.length}
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
          <div className=" flex flex-row flex-wrap gap-2 justify-center w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <PostCard key={index} darkMode={isDarkMode} user={currentUser} />
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

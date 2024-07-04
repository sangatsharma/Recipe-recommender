import { useThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "../../Component/Loader/Skeleton";

const Profile = () => {
  const { isDarkMode } = useThemeContext();
  const { userInfo, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("posts");

  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="w-[80%] mx-auto p-8 ">
      <Helmet>
        <title>Profile - CIY </title>
      </Helmet>
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={
            userInfo.profile_pic ||
            "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold">{userInfo.name}</h1>
          <p className="text-gray-500">{`@${userInfo.name.split(" ")[0]}${
            userInfo.id
          }`}</p>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">
            Follow
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg">
            Message
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex space-x-8 mb-8">
        <div className="text-center">
          <span className="block text-xl font-bold">123</span>
          <span className="text-gray-500">Posts</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold">{userInfo.followers}</span>
          <span className="text-gray-500">Followers</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold">{userInfo.following}</span>
          <span className="text-gray-500">Following</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-8">
        <section className="flex space-x-8 text-xl p-2">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <img
              key={index}
              src={`https://via.placeholder.com/150?text=Post+${index + 1}`} // Replace with actual image URLs
              alt={`Post ${index + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
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

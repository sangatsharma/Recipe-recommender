import { useState, useEffect, useContext } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PeopleCard = ({ userDetails, profilePage = false }) => {
  const { isDarkMode } = useThemeContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const { userInfo, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateToProfile = () => {
    const path = userDetails.name.split(" ")[0] + "_" + userDetails.id;
    navigate(`/profile/${path}`, { state: userDetails });
  };

  useEffect(() => {
    // Check if the user is following this user
    if (isAuthenticated && userInfo.following) {
      setIsFollowing(userInfo.following.includes(userDetails.id));
    }
  }, [userInfo, userDetails]);

  const handleFollow = async () => {
    try {
      if (!isAuthenticated) {
        toast.error("Please login to follow this user");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/follow`,
        {
          email: userDetails?.email,
          action: isFollowing ? "unfollow" : "follow",
        },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(
          `Successfully ${isFollowing ? "Unfollowed" : "Followed"} ${
            userDetails?.name
          }`
        );
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col below-sm:w-full mb-2 border-1 rounded-md  below-sm:px-0 w-[500px] ${
        isDarkMode ? "bg-[#302e2e]" : "bg-[#dbeafe]"
      }`}
    >
      <div
        className={`flex flex-row justify-between  below-sm:w-full mb-2 border-1 rounded-md px-4 py-2`}
      >
        <div
          className="flex flex-row justify-start cursor-pointer"
          onClick={navigateToProfile}
        >
          <img
            src={
              userDetails?.profile_pic ||
              "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
            }
            alt="Profile"
            className="w-24 h-24 mt-3 below-sm:ml-[-8px] below-sm:w-10 below-sm:h-10 rounded-full object-cover"
          />
          <div className="flex flex-col justify-start items-baseline  x ">
            <h1 className="text-xl  below-sm:text-sm font-bold mt-2 pl-2 text-start">
              {userDetails?.name}
            </h1>
            <p className="text-gray-500 text-sm pl-3">{`@${
              userDetails.name?.split(" ")[0]
            }${userDetails.id}`}</p>
            <p className="mt-1 opacity-50">
              <i className="fa-sharp fa-solid fa-location-dot px-2 "></i>
              {userDetails.city}
            </p>
          </div>
        </div>
        <div className="ml-auto">
          {isAuthenticated && userInfo.id !== userDetails.id ? (
            <button
              className={`px-3 py-2 ${
                isFollowing
                  ? "bg-slate-500 hover:bg-slate-400"
                  : "bg-blue-700 hover:bg-blue-500"
              }  text-white text-sm rounded-lg mt-2`}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          ) : null}

          {/* <button className="px-4 py-2 border border-gray-300 rounded-lg">
          Message
        </button> */}
        </div>
      </div>
      <p
        className={`${
          profilePage ? "" : "text-ellipsis line-clamp-3 "
        } px-2 pb-1`}
      >
        {userDetails.bio}
      </p>
    </div>
  );
};
export default PeopleCard;

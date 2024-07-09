import { useState, useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";

const PeopleCard = ({ userInfo }) => {
  const { isDarkMode } = useThemeContext();
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    // Check if the user is following this user
    // setIsFollowing(true);
  }, []);

  return (
    <div
      className={`flex flex-row justify-between w-[40%] below-sm:w-full  space-x-3 mb-2 border-1 rounded-md px-4 py-2  ${
        isDarkMode ? "bg-[#302e2e]" : "bg-[#dbeafe]"
      }`}
    >
      <div className="flex flex-row justify-start">
        <img
          src={
            userInfo.profile_pic ||
            "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold mt-2 pl-2">{userInfo.name}</h1>
          <p className="text-gray-500 text-sm pl-3">{`@${
            userInfo.name.split(" ")[0]
          }${userInfo.id}`}</p>
          <p className="mt-2 opacity-50">
            <i className="fa-sharp fa-solid fa-location-dot px-2 "></i>
            {userInfo.city}
          </p>
        </div>
      </div>
      <div className="ml-auto">
        <button
          className={`px-4 py-2 ${
            isFollowing ? "bg-slate-400" : "bg-blue-500"
          }  text-white rounded-lg mt-2`}
          onClick={() => {
            setIsFollowing(!isFollowing);
          }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
        {/* <button className="px-4 py-2 border border-gray-300 rounded-lg">
          Message
        </button> */}
      </div>
    </div>
  );
};
export default PeopleCard;
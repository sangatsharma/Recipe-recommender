import EditProfile from "./EditProfile";
import {useThemeContext} from "../../context/ThemeContext";
import {AuthContext} from "../../context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { userInfo } = useContext(AuthContext);
  const { isDarkMode } = useThemeContext();
  return <EditProfile darkMode={isDarkMode}/>;
};
export default Profile;

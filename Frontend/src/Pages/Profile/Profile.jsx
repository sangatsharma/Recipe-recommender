import EditProfile from "./EditProfile";
import {useThemeContext} from "../../context/ThemeContext";
import {AuthContext} from "../../context/AuthContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { userInfo } = useContext(AuthContext);
  const { isDarkMode } = useThemeContext();
  return (
  <>
    <Helmet>
  <title>Profile - CIY </title>
  </Helmet>
  <EditProfile darkMode={isDarkMode}/>
  </>);
};
export default Profile;

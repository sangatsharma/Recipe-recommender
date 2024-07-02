import {useThemeContext} from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";

const Profile = () => {

  const { isDarkMode } = useThemeContext();
  return (
  <>
    <Helmet>
  <title>Profile - CIY </title>
  </Helmet>
  <h1>Profile</h1>
  
  </>);
};
export default Profile;

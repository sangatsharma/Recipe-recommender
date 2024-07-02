import EditProfile from "./EditProfile";
import { useThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";
const Settings = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <>
      <Helmet>
        <title>User Settings - CIY </title>
      </Helmet>
      <EditProfile darkMode={isDarkMode} />
    </>
  );
};
export default Settings;

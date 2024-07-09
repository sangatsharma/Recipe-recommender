import EditProfile from "./EditProfile";
import { useThemeContext } from "../../context/ThemeContext";
import { Helmet } from "react-helmet-async";
const Settings = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div
      className={`w-full m-auto p-6 below-sm:p-2 ${
        isDarkMode ? " text-white" : " text-black"
      }`}
    >
      <Helmet>
        <title>User Settings - CIY </title>
      </Helmet>
      <EditProfile darkMode={isDarkMode} />
    </div>
  );
};
export default Settings;

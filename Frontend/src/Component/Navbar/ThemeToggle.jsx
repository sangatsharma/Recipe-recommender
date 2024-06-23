import React, { useContext } from "react";
import { useThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <p onClick={toggleTheme} className=" p-2  h-12 w-12 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer  flex justify-center">
      <i className={`fas ${isDarkMode ? "fa-sun  text-2xl text-yellow-500" : "fa-moon  text-2xl"}`}></i>
    </p>
  );
};

export default ThemeToggle;

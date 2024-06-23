import "./Navbar.css";
import {Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "../../context/ThemeContext";

const MobileNavbar = () => {
const { isDarkMode } = useThemeContext();


  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className={isDarkMode?"dark-mode":"light-mode"}>
      <div className="flex flex-wrap  h-auto px-1 w-[100%] justify-between ">
        <Link to="/">
          <div className="LogoWrapper flex">
            <img loading="lazy" src={logo} alt="Logo" />
            <p className="BrandName">Cook It Yourself</p>
          </div>
        </Link>
        <div className="Profile flex">
          <ThemeToggle />
          {isAuthenticated && <NotificationButton />}
          {!isAuthenticated && (
          <button
            className={location === "/signup" ? "activeButton signup" : ""}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}
          <ProfileDropdown isMobile={true} />
        </div>
      </div>
    </header>
  );
};
export default MobileNavbar;

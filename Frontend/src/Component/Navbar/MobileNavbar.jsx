import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "../../context/ThemeContext";
import { FiPlusCircle } from "react-icons/fi";

const MobileNavbar = () => {
  const { isDarkMode } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        if (isOpen) {
          setShow(true);
        } else {
          setShow(false);
        }
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [isOpen, lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header
      className={`${isDarkMode ? "dark-mode" : "light-mode"} ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-label="Mobile Navigation"
    >
      <div className="flex flex-wrap h-auto px-1 w-[100%] justify-between">
        <Link to="/" aria-label="Home">
          <div className="LogoWrapper flex">
            <img loading="lazy" src={logo} alt="Cook It Yourself Logo" />
          </div>
        </Link>
        <div className="Profile flex">
          {isAuthenticated && (
            <FiPlusCircle
              onClick={() => navigate("/upload")}
              className="p-2 h-12 w-12 rounded-full hover:bg-gray-300 cursor-pointer flex justify-center"
              aria-label="Upload"
            />
          )}
          <ThemeToggle aria-label="Theme Toggle" />
          {isAuthenticated && <NotificationButton aria-label="Notifications" />}
          {!isAuthenticated && (
            <button
              className={location === "/signup" ? "activeButton signup" : ""}
              onClick={() => navigate("/signup")}
              aria-label="Sign Up"
            >
              Sign Up
            </button>
          )}
          <ProfileDropdown
            isMobile={true}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            aria-label="Profile Dropdown"
          />
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;

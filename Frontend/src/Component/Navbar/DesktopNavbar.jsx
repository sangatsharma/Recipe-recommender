import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotificationButton from "./NotificationButton";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "../../context/ThemeContext";
import { FiPlusCircle } from "react-icons/fi";

const DesktopNavbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isActive = location === "/" || location === "/home";
  const [showNavbar, setShowNavbar] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      if (isOpen) {
        setIsOpen(false);
      }
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  }, [isOpen, lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`${showNavbar ? "translate-y-0" : "-translate-y-full"} ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Link to="/" aria-label="Home">
        <div className="LogoWrapper">
          <img loading="lazy" src={logo} alt="Cook It Yourself Logo" />
          <p className="BrandName">Cook It Yourself</p>
        </div>
      </Link>
      <nav aria-label="Primary">
        <button
          className={isActive ? "activePage" : ""}
          onClick={isActive ? handleScrollToTop : () => navigate("/home")}
          aria-label="Home Page"
        >
          Home
        </button>
        <button
          className={location === "/recipes" ? "activePage" : ""}
          onClick={
            location === "/recipes"
              ? handleScrollToTop
              : () => navigate("/recipes")
          }
          aria-label="Recipes Page"
        >
          Recipes
        </button>
        <button
          className={location === "/explore" ? "activePage" : ""}
          onClick={
            location === "/explore"
              ? handleScrollToTop
              : () => navigate("/explore")
          }
          aria-label="Explore Page"
        >
          Explore
        </button>
        <button
          className={location === "/search" ? "activePage" : ""}
          onClick={
            location === "/search"
              ? handleScrollToTop
              : () => navigate("/search")
          }
          aria-label="Search Page"
        >
          Search
        </button>
        <button
          className={location === "/contact" ? "activePage" : ""}
          onClick={
            location === "/contact"
              ? handleScrollToTop
              : () => navigate("/contact")
          }
          aria-label="Contact Page"
        >
          Contact
        </button>
      </nav>
      <div className="Profile">
        {isAuthenticated && (
          <FiPlusCircle
            onClick={() => navigate("/upload")}
            className="p-2 h-10 w-10 rounded-full hover:bg-gray-300 cursor-pointer flex justify-center"
            aria-label="Upload"
          />
        )}
        {isAuthenticated && (
          <>
            <Link to="/bookmarks" aria-label="Bookmarks">
              <span className="flex items-center justify-center cursor-pointer m-auto pb-1 transition-all hover:scale-125 hover:border-b-2 border-orange-500 w-5 h-8 mr-2">
                <i className="fas fa-bookmark text-orange-500 text-2xl"></i>
              </span>
            </Link>
            <NotificationButton aria-label="Notifications" />
          </>
        )}
        <ThemeToggle aria-label="Theme Toggle" />
        {!isAuthenticated && (
          <button
            className={location === "/signup" ? "activeButton signup" : "signup"}
            onClick={() => navigate("/signup")}
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        )}

        <ProfileDropdown
          isMobile={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          aria-label="Profile Dropdown"
        />
      </div>
    </header>
  );
};
export default DesktopNavbar;

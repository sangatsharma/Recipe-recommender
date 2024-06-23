import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotificationButton from "./NotificationButton";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "../../context/ThemeContext";

const DesktopNavbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();

  const location = useLocation().pathname;
  const isActive = location === "/" || location === "/home";
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeout = 3000; // 3 seconds of idle time

  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    // Event listeners to detect user activity
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);

    // Initial timer setup
    idleTimer = setTimeout(() => setIsIdle(true), idleTimeout);

    // Cleanup event listeners and timeout
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
    };
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`${isIdle ? "hide" : "show"} ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Link to="/">
        <div className="LogoWrapper">
          <img loading="lazy" src={logo} alt="Logo" />
          <p className="BrandName">Cook It Yourself</p>
        </div>
      </Link>
      <nav>
        <button
          className={isActive ? "activePage" : ""}
          onClick={isActive ? handleScrollToTop : () => navigate("/home")}
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
        >
          Contact
        </button>
      </nav>
      <div className="Profile">
        <ThemeToggle />
        {!isAuthenticated && (
          <button
            className={location === "/signup" ? "activeButton signup" : ""}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}
        {isAuthenticated && (
          <>
            <Link to="/bookmarks">
              <span className="flex items-center justify-center  cursor-pointer m-auto pb-1 transition-all hover:scale-125 hover:border-b-2 border-orange-500 w-5 h-8 mr-2 ">
                <i className="fas fa-bookmark text-orange-500 text-2xl"></i>
              </span>
            </Link>
            <NotificationButton />
          </>
        )}
        <ProfileDropdown isMobile={false} />
      </div>
    </header>
  );
};
export default DesktopNavbar;

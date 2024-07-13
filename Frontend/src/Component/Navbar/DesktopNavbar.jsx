import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useEffect, useState, useContext } from "react";
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

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        if (isOpen) {
          setIsOpen(false);
        }
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`${showNavbar ? "translate-y-0" : "-translate-y-full"} ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Link to="/">
        <div className="LogoWrapper ">
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
        {isAuthenticated && (
          <FiPlusCircle onClick={() => navigate("/upload")} className=" p-2  h-10 w-10 rounded-full  hover:bg-gray-300 cursor-pointer  flex justify-center"/>
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
        <ThemeToggle />
        {!isAuthenticated && (
          <button
            className={location === "/signup" ? "activeButton signup" : ""}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}

        <ProfileDropdown
          isMobile={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </header>
  );
};
export default DesktopNavbar;

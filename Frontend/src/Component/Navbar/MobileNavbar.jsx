import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";
import { useThemeContext } from "../../context/ThemeContext";import { FiPlusCircle } from "react-icons/fi";

const MobileNavbar = () => {
  const { isDarkMode } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
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
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header
      className={`${isDarkMode ? "dark-mode" : "light-mode"} ${
        show ? "translate-y-0" : "-translate-y-full"
      } `}
    >
      <div className="flex flex-wrap  h-auto px-1 w-[100%] justify-between ">
        <Link to="/">
          <div className="LogoWrapper flex">
            <img loading="lazy" src={logo} alt="Logo" />
            {/* <p className="BrandName">Cook It Yourself</p> */}
          </div>
        </Link>
        <div className="Profile flex">
        {isAuthenticated && (
          <FiPlusCircle onClick={() => navigate("/upload")} className=" p-2  h-12 w-12 rounded-full  hover:bg-gray-300 cursor-pointer  flex justify-center"/>
        )}
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
          <ProfileDropdown
            isMobile={true}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </header>
  );
};
export default MobileNavbar;

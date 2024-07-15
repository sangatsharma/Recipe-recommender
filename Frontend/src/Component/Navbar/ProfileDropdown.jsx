import React, { useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useThemeContext } from "../../context/ThemeContext";

const ProfileDropdown = ({ isMobile, isOpen, setIsOpen }) => {
  const { setIsAuthenticated, isAuthenticated, userInfo } = useContext(AuthContext);
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Logout = async () => {
    const isLogout = await handleLogout();
    if (isLogout.success) {
      setIsAuthenticated(false);
      handleToggle();
      window.location.reload();
      navigate("/");
      toast.success(isLogout.body.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen]);

  return isMobile ? (
    <div ref={dropdownRef} className="overflow-hidden">
      <button onClick={handleToggle} className="focus:outline-none" aria-label="Toggle menu">
        <i className="fas fa-bars text-2xl cursor-pointer text-gray-500 hover:text-orange-400"></i>
      </button>
      <div
        className={`sidebar ${isOpen ? "open" : "closed"} ${isDarkMode ? "bg-[#303030] border-l border-[#4a4a4a]" : "bg-white"} rounded-[10px] h-screen w-64 shadow-lg p-4 flex flex-col justify-between fixed top-0 right-0 transition-all`}
      >
        <div>
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            onClick={handleToggle}
          >
            <div className="flex items-center space-x-4 p-2 mb-4">
              <img
                loading="lazy"
                src={
                  isAuthenticated
                    ? userInfo.profile_pic ||
                      "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
                    : "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full transition-shadow hover:shadow-gray-400 shadow-md"
              />
              <div>
                {isAuthenticated ? (
                  <>
                    <h2 className="font-semibold">Good Day 👋</h2>
                    <span className={`text-sm ${isDarkMode ? "text-gray-100" : "text-gray-500"}`}>
                      {userInfo.name}
                    </span>
                  </>
                ) : (
                  <p className="text-[28px] text-gray-500">Login</p>
                )}
              </div>
            </div>
          </Link>
          <hr className="h-2"></hr>
          <nav className={`${isDarkMode ? "dark-mode" : "light-mode"}`} onClick={handleToggle}>
            {["home", "recipes", "explore", "search", "contact", "bookmarks", "settings"].map((page) => (
              <button
                key={page}
                className={location === `/${page}` ? "activePage" : ""}
                onClick={() => {
                  navigate(`/${page}`);
                  handleScrollToTop();
                }}
                aria-label={`Navigate to ${page}`}
              >
                <i
                  className={`fas fa-${page === "home" ? "home" : page === "recipes" ? "utensils" : page === "explore" ? "compass" : page === "search" ? "search" : page === "contact" ? "address-book" : page === "bookmarks" ? "bookmark" : "cog"} text-2xl pr-2 ${
                    location === `/${page}` ? "text-orange-400" : "text-gray-500"
                  }`}
                ></i>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
            {isAuthenticated && (
              <button onClick={Logout} aria-label="Logout">
                <i className="fas fa-sign-out-alt text-2xl pr-2 text-gray-500"></i>
                Logout
              </button>
            )}
          </nav>
        </div>
        <div className="border-t py-2 mb-32">
          <div className="flex justify-around text-sm">
            <Link to="/privacy" className="hover:text-blue-500">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blue-500">
              Terms
            </Link>
            <Link to="/aboutus" className="hover:text-blue-500">
              About us
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={isAuthenticated ? handleToggle : null}
        className="focus:outline-none"
        aria-label="Profile"
        aria-expanded={isOpen}
      >
        <Link to={isAuthenticated ? `${location}` : "/login"}>
          <img
            loading="lazy"
            src={
              isAuthenticated
                ? userInfo.profile_pic ??
                  "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
                : "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full transition-shadow hover:shadow-gray-400 shadow-md"
          />
        </Link>
      </button>
      {isOpen && (
        <div className="relative">
          <div className="absolute top-0 right-3.5 w-5 h-5 z-0 transform rotate-45 bg-white border-t border-l border-white"></div>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <ul className="py-1 relative z-10">
              <li>
                <Link
                  to="/profile"
                  onClick={handleToggle}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  aria-label="Profile"
                >
                  <i className="fas fa-user mr-2"></i> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  onClick={handleToggle}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  aria-label="Settings"
                >
                  <i className="fas fa-cog mr-2"></i> Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={Logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  aria-label="Logout"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

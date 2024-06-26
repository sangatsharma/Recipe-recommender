import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleLogout } from "../../utils/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

const ProfileDropdown = ({ isMobile }) => {
  const { setIsAuthenticated, isAuthenticated, userInfo } =
    useContext(AuthContext);
  const { isDarkMode } = useThemeContext();

  const navigate = useNavigate();
  //get current location path
  const location = useLocation().pathname;

  const isActive = location === "/" || location === "/home";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Logout = async () => {
    const isLogout = await handleLogout();
    if (isLogout.success) {
      setIsAuthenticated(false);
      handleToggle();
      toast.success(isLogout.body.message);
      navigate("/");
    }
  };

  // Close dropdown when clicking outside
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
  }, [dropdownRef]);

  return isMobile ? (
    <div ref={dropdownRef} className="overflow-hidden">
      <p onClick={handleToggle} className="focus:outline-none">
        <i className="fas fa-bars text-2xl cursor-pointer text-gray-500 hover:text-orange-400"></i>
      </p>
      <div
        className={`sidebar ${isOpen ? "open" : "closed"}  ${
          isDarkMode ? "bg-[#303030] border-l border-[#4a4a4a]" : "bg-white"
        } rounded-[10px] h-screen w-64 shadow-lg p-4 flex flex-col justify-between fixed top-0 right-0 transition-all`}
      >
        <div>
          {/* Profile Section */}
          <Link
            to={`${isAuthenticated ? "/profile" : "/login"}`}
            onClick={handleToggle}
          >
            <div className="flex items-center space-x-4 p-2 mb-4">
              <img
                loading="lazy"
                src="https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
                alt="Profile"
                className="w-12 h-12 rounded-full transition-shadow hover:shadow-gray-400 shadow-md"
              />
              <div>
                {isAuthenticated ? (
                  <>
                    <h2 className="font-semibold">Good Day 👋</h2>
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-100" : "text-gray-500"
                      } `}
                    >
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

          {/* Navigation */}
          <nav
            className={`${isDarkMode ? "dark-mode" : "light-mode"}`}
            onClick={handleToggle}
          >
            <button
              className={isActive ? "activePage" : ""}
              onClick={isActive ? handleScrollToTop : () => navigate("/home")}
            >
              <i
                className={`fas fa-home text-2xl pr-2 ${
                  isActive ? " text-orange-400" : " text-gray-500"
                } `}
              ></i>
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
              <i
                className={`fas fa-utensils text-2xl pr-2 ${
                  location === "/recipes"
                    ? " text-orange-400"
                    : " text-gray-500"
                } `}
              ></i>
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
              <i
                className={`fas fa-compass text-2xl pr-2 ${
                  location === "/explore"
                    ? " text-orange-400"
                    : " text-gray-500"
                } `}
              ></i>
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
              <i
                className={`fas fa-search text-2xl pr-2 ${
                  location === "/search" ? " text-orange-400" : " text-gray-500"
                } `}
              ></i>
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
              <i
                className={`fas fa-address-book text-2xl pr-2 ${
                  location === "/contact"
                    ? " text-orange-400"
                    : " text-gray-500"
                } `}
              ></i>
              Contact
            </button>

            <button
              className={location === "/bookmarks" ? "activePage" : ""}
              onClick={
                location === "/bookmarks"
                  ? handleScrollToTop
                  : () => navigate("/bookmarks")
              }
            >
              <i
                className={`fas fa-bookmark text-2xl pr-2 ${
                  location === "/bookmarks"
                    ? " text-orange-400"
                    : " text-gray-500"
                } `}
              ></i>
              Favorites
            </button>
            <button
              className={location === "/settings" ? "activePage" : ""}
              onClick={
                location === "/settings"
                  ? handleScrollToTop
                  : () => navigate("/settings")
              }
            >
              <i
                className={`fas fa-cog text-2xl pr-2 ${
                  location === "/settings"
                    ? " text-orange-400"
                    : " text-gray-500"
                } `}
              ></i>
              Settings
            </button>

            {isAuthenticated && (
              <button onClick={Logout}>
                <i
                  className={`fas fa-sign-out-alt text-2xl pr-2 ${
                    location === "/logout"
                      ? " text-orange-400"
                      : " text-gray-500"
                  } `}
                ></i>
                Logout
              </button>
            )}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="border-t  py-2 mb-32">
          <div className="flex justify-between mb-4"></div>
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
      >
        {/* check if user is login if not redirect to login page */}
        <Link to={isAuthenticated ? `${location}` : "/login"}>
          <img
            loading="lazy"
            src="https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
            alt="Profile"
            className="w-12 h-12 rounded-full transition-shadow hover:shadow-gray-400 shadow-md"
          />
        </Link>
      </button>
      {isOpen && (
        <div className="relative">
          {/* Arrow */}
          <div className="absolute top-0 right-3.5 w-5 h-5 z-0  transform rotate-45 bg-white border-t border-l border-white"></div>
          {/* Dropdown content */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <ul className="py-1 relative z-10">
              <li>
                <Link
                  to="/profile"
                  onClick={handleToggle}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-user mr-2"></i> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  onClick={handleToggle}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-cog mr-2"></i> Settings
                </Link>
              </li>
              <li>
                <Link
                  onClick={Logout}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

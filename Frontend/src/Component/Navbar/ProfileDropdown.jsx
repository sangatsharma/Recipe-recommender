import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleLogout } from "../../utils/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  //get current location path
  const location = useLocation().pathname;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
  return (
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
            className="w-12 h-12 rounded-full transition-shadow hover:shadow-md"
          />
        </Link>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {/* Arrow */}
          <div className="absolute top-0 right-2 w-5 h-5 z-0  transform rotate-45 bg-white border-t border-l border-white"></div>
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
                to="/"
                onClick={Logout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

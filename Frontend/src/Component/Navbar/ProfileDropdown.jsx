import { useState, useRef, useEffect } from "react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
      <button onClick={handleToggle} className="focus:outline-none">
        <img
          onClick={() => {
            props.setSelectedPage("Login");
          }}
          loading="lazy"
          src="https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
          alt="Profile"
          className="w-12 h-12 rounded-full transition-shadow hover:shadow-md"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {/* Arrow */}
          <div className="absolute top-0 right-2 w-5 h-5  transform rotate-45 bg-white border-t border-l border-white"></div>
          {/*//todo change anchor tag to link when routes are setup */}
          <ul className="py-1">
            <li>
              <a
                href="https://www.google.com"
                target="_blank"
                onClick={handleToggle}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i className="fas fa-user mr-2"></i> Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleToggle}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i className="fas fa-cog mr-2"></i> Settings
              </a>
            </li>
            <li>
              <a
                onClick={handleToggle}
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

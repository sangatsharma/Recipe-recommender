import React, { useState, useRef, useEffect } from "react";

const RecipeOptions = ({ isMyRecipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown when clicking the button
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-4xl hover:text-blue-500 rotate-180 pb-2"
        onClick={toggleDropdown}
      >
        ...
      </button>

      {isOpen && (
        <ul className="absolute z-10 bg-gray-800 text-white border border-gray-300 rounded  w-48 right-0 top-10 shadow-lg cursor-pointer">
          {isMyRecipe && (
            <>
              <li className="px-4 py-2 hover:bg-black">Edit</li>
              <li className="px-4 py-2 hover:bg-black">Delete</li>
            </>
          )}
          <li className="px-4 py-2 hover:bg-black">Not interested</li>
          <li className="px-4 py-2 hover:bg-black">Report as unsafe</li>
        </ul>
      )}
    </div>
  );
};

export default RecipeOptions;

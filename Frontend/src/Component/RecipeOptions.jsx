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
        <section className="absolute z-10  bg-gray-800 text-white border border-gray-300 rounded  w-48 right-0 top-10 shadow-lg cursor-pointer">
          {isMyRecipe && (
            <>
              <button className="px-4 py-2 flex  hover:bg-black w-full">Edit</button>
              <button className="px-4 py-2 flex hover:bg-black w-full">Delete</button>
            </>
          )}
          <button className="px-4 py-2 flex hover:bg-black w-full">Not interested</button>
          <button className="px-4 py-2 flex hover:bg-black w-full">Report as unsafe</button>
        </section>
      )}
    </div>
  );
};

export default RecipeOptions;

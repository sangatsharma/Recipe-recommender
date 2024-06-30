import React, { useState } from "react";

const StarRating = ({ totalStars = 5, onRating=()=>{} }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  const handleMouseEnter = (index) => setHoverRating(index);
  const handleMouseLeave = () => setHoverRating(0);
  const handleClick = (index) => {
    setRating(index);
    onRating(index);
  };
  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <svg
            key={index}
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              (hoverRating || rating) >= starIndex
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.568L24 9.432l-6 5.853 1.416 8.264L12 18.897l-7.416 4.652L6 15.285 0 9.432l8.332-1.277L12 .587z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;

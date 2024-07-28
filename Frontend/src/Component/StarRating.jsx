import React, { useState } from "react";

const StarRating = ({ totalStars = 5, onRating = () => {} }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };
  const handleMouseLeave = () => setHoverRating(0);
  const handleClick = (index) => {
    if (rating === index) {
      setRating(0);
      onRating(0);
      return;
    }
    setRating(index);
    onRating(index);
  };
  return (
    <div className="border-2 below-sm:p-1 p-2 rounded-md">
      <h2 className="text-xl font-semibold mb-2 below-sm:text-md">We Value Your Feedback!</h2>
      <p className="mb-1 text-sm">
        Thank you for trying our recipe. We'd love to hear your thoughts on it.
        Your feedback helps us improve and provide better recipes for you.
      </p>
      <div className="flex gap-2 flex-wrap">
      <p className="">Please rate this recipe:</p>
      <div className="flex space-x-1 h-auto">
        {[...Array(totalStars)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <svg
              key={index}
              className={`w-6 h-6 cursor-pointer transition-colors duration-200 hover:scale-150 ${
                (hoverRating || rating) >= starIndex
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starIndex)}
              fill="currentColor"
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
          );
        })}
      </div>
      </div>
      

   
    </div>
  );
};

export default StarRating;

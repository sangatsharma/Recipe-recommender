// PostCard.js
import React from 'react';
import StarRating from './StarRating';

const PostCard = ({ darkMode }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} w-[50%] below-sm:w-[100%]`}>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src="https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
          alt="Avatar"
        />
        <div>
          <div className="font-bold text-lg">Mr Sangat</div>
          <div className="text-sm text-gray-500">@Sangat</div>
        </div>
      </div>
      <div className='w-[100%]'>
      <h2 className="text-2xl font-bold mb-2">Vegan and gluten free chocolate chip cookies</h2>
      <p className="mb-4">
        I spent the last 3 years perfecting the vegan and gluten free chocolate chip cookie recipe.
        I am so excited to share it with you all!
      </p>
      </div>
      <img className="rounded-lg mb-4 w-full h-[500px] m-auto" src="https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg" alt="Cookies" />
      <div className="flex justify-between text-sm text-gray-500">
      <StarRating />
      </div>
    </div>
  );
};

export default PostCard;

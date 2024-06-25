// PostCard.js
import React from 'react';

const PostCard = ({ darkMode }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} w-[50%]`}>
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src="https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.6435-1/123108473_1042706159510253_7233714013747441365_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=101&ccb=1-7&_nc_sid=e4545e&_nc_ohc=tZdBbg-Ok8gQ7kNvgGONH8S&_nc_ht=scontent.fpkr1-1.fna&oh=00_AYAq0yBvLRvaCOoIgu2bcKdgOj_v7fH-dUynKNKqKqw5HA&oe=66A1D035"
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
        {/* <div className="flex space-x-4">
          <span>6.2k</span>
          <span>1.2k</span>
          <span>1.1k</span>
          <span>1.2k</span>
        </div> */}
      </div>
    </div>
  );
};

export default PostCard;

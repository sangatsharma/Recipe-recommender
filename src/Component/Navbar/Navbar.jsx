import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <header>
      <div className="LogoWrapper">
        <img loading="lazy" src="https://static.vecteezy.com/system/resources/previews/000/274/987/original/vector-restaurant-label-food-service-logo.jpg" alt="Logo" />
        <span className="BrandName">Delish</span>
      </div>
      <nav className="circle">
        <button>Home</button>
        <button>Recipes</button>
        <button>Search</button>
        <button>Contact</button>
      </nav>
      <div className="Profile">
        <button>Sign up</button>
        <img
          loading="lazy"
          src="https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
          alt="Profile"
        />
      </div>
    </header>
  );
};
export default Navbar;

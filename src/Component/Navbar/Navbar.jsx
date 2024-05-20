import React, { useState } from "react";
import "./Navbar.css";

const Navbar = (props) => {
  const [selectedPage, setSelectedPage] = useState("Home");
  console.log(selectedPage);
  return (
    <header>
      <div className="LogoWrapper">
        <img
          loading="lazy"
          src="https://static.vecteezy.com/system/resources/previews/000/274/987/original/vector-restaurant-label-food-service-logo.jpg"
          alt="Logo"
        />
        <span className="BrandName">Delish</span>
      </div>
      <nav>
        <button
          className={selectedPage == "Home" ? "activePage" : ""}
          onClick={() => {
            setSelectedPage("Home");
          }}
        >
          Home
        </button>
        <button
          className={selectedPage == "Recipes" ? "activePage" : ""}
          onClick={() => {
            setSelectedPage("Recipes");
          }}
        >
          Recipes
        </button>
        <button
          className={selectedPage == "Explore" ? "activePage" : ""}
          onClick={() => {
            setSelectedPage("Explore");
          }}
        >
          Explore
        </button>
        <button
          className={selectedPage == "Search" ? "activePage" : ""}
          onClick={() => {
            setSelectedPage("Search");
          }}
        >
          Search
        </button>
        <button
          className={selectedPage == "Contact" ? "activePage" : ""}
          onClick={() => {
            setSelectedPage("Contact");
          }}
        >
          Contact
        </button>
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

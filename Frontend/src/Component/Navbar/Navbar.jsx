import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import { useLocation, Link } from "react-router-dom";
const Navbar = () => {
  const location = useLocation().pathname;
  console.log(location);
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
        <button className={location == "/home" ? "activePage" : ""}>
          <Link to="/home">Home</Link>
        </button>
        <button className={location == "/recipes" ? "activePage" : ""}>
          <Link to="/recipes">Recipes</Link>
        </button>
        <button className={location == "/explore" ? "activePage" : ""}>
          <Link to="/explore">Explore</Link>
        </button>
        <button className={location == "/search" ? "activePage" : ""}>
          <Link to="/search">Search</Link>
        </button>
        <button className={location == "/contact" ? "activePage" : ""}>
          <Link to="/contact">Contact</Link>
        </button>
      </nav>
      <div className="Profile">
        <button className={location == "/signup" ? "activePage" : ""}>
          <Link to="/signup">Sign Up</Link>
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
};
export default Navbar;

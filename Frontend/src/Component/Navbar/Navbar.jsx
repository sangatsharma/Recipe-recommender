import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useEffect, useState } from "react";

const Navbar = ({isLogin}) => {
  const location = useLocation().pathname;
  const isActive = location === "/" || location === "/home";

  const [isIdle, setIsIdle] = useState(false);
  const idleTimeout = 3000; // 3 seconds of idle time

  useEffect(() => {
    let idleTimer;

    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    // Event listeners to detect user activity
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);

    // Initial timer setup
    idleTimer = setTimeout(() => setIsIdle(true), idleTimeout);

    // Cleanup event listeners and timeout
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
    };
  }, []);

  return (
    <header className={`${isIdle ? "hide" : "show"}`}>
      <Link to="/home">
     <div className="LogoWrapper">
        <img loading="lazy" src={logo} alt="Logo" />
        <p className="BrandName">Cook It Yourself  {`${isLogin}`}</p>
      </div></Link>
      <nav>
        <button className={isActive ? "activePage" : ""}>
          <Link to="/home">Home</Link>
        </button>
        <button className={location === "/recipes" ? "activePage" : ""}>
          <Link to="/recipes">Recipes</Link>
        </button>
        <button className={location === "/explore" ? "activePage" : ""}>
          <Link to="/explore">Explore</Link>
        </button>
        <button className={location === "/search" ? "activePage" : ""}>
          <Link to="/search">Search</Link>
        </button>
        <button className={location === "/contact" ? "activePage" : ""}>
          <Link to="/contact">Contact</Link>
        </button>
      </nav>
      <div className="Profile">
        <button className={location === "/signup" ? "activeButton" : ""}>
          <Link to="/signup">Sign Up</Link>
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
};
export default Navbar;

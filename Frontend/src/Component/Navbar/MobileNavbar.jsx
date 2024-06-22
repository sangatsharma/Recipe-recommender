import "./Navbar.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo_SVG.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";

const MobileNavbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className="">
      <div className="flex flex-wrap  h-auto px-1 w-[100%] justify-between ">
        <Link to="/">
          <div className="LogoWrapper flex">
            <img loading="lazy" src={logo} alt="Logo" />
            <p className="BrandName">Cook It Yourself</p>
          </div>
        </Link>
        <div className="Profile flex">
          {isAuthenticated && <NotificationButton />}
          {!isAuthenticated && (
          <button
            className={location === "/signup" ? "activeButton signup" : ""}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        )}
          <ProfileDropdown isMobile={true} />
        </div>
      </div>
    </header>
  );
};
export default MobileNavbar;

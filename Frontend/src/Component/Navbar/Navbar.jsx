
import "./Navbar.css";

const Navbar = (props) => {

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
          className={props.selectedPage == "Home" ? "activePage" : ""}
          onClick={() => {
            props.setSelectedPage("Home");
          }}
        >
          Home
        </button>
        <button
          className={props.selectedPage == "Recipes" ? "activePage" : ""}
          onClick={() => {
            props.setSelectedPage("Recipes");
          }}
        >
          Recipes
        </button>
        <button
          className={props.selectedPage == "Explore" ? "activePage" : ""}
          onClick={() => {
            props.setSelectedPage("Explore");
          }}
        >
          Explore
        </button>
        <button
          className={props.selectedPage == "Search" ? "activePage" : ""}
          onClick={() => {
            props.setSelectedPage("Search");
          }}
        >
          Search
        </button>
        <button
          className={props.selectedPage == "Contact" ? "activePage" : ""}
          onClick={() => {
            props.setSelectedPage("Contact");
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
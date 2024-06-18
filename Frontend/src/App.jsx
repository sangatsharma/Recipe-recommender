import SignupPage from "./Pages/SignupPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Explore from "./Pages/Explore.jsx";
import Contact from "./Pages/Contact.jsx";
import Recipes from "./Pages/Recipes.jsx";
import RecipeDetails from "./Pages/RecipeDetails.jsx";
import Homepage from "./Pages/HomePage.jsx";
import RootPageLayout from "./Pages/RootPageLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Pages/Search.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Settings from "./Pages/Profile/Settings.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import { isAuthenticated, removeToken } from "./utils/auth.js";
import { useEffect, useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    // console.log("isloggedin",isLoggedIn);
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootPageLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      ),
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/home", element: <Homepage /> },
        { path: "/recipes", element: <Recipes /> },
        { path: "/recipes/:recipeName", element: <RecipeDetails /> },
        { path: "/search", element: <Search /> },
        { path: "/contact", element: <Contact /> },
        { path: "/explore", element: <Explore /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/profile", element: <Profile /> },
        { path: "/profile", element: <SignupPage /> },
        { path: "/settings", element: <Settings /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

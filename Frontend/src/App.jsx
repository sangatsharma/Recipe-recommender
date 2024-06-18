import SignupPage from "./Pages/SignupPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Explore from "./Pages/Explore.jsx";
import Contact from "./Pages/Contact.jsx";
import Recipes from "./Pages/Recipes.jsx";
import RecipeDetails from "./Pages/RecipeDetails.jsx";
import Homepage from "./Pages/HomePage.jsx";
import RootPageLayout from "./Pages/RootPageLayout.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Search from "./Pages/Search.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Settings from "./Pages/Profile/Settings.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./utils/auth.js";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
  }, []);

  const handleLogout = () => {
    // removeToken();
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootPageLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      ),
      errorElement: <PageNotFound />,
      children: isLoggedIn
        ? [
            { path: "/", element: <Homepage /> },
            { path: "/home", element: <Homepage /> },
            { path: "/recipes", element: <Recipes /> },
            { path: "/recipes/:recipeName", element: <RecipeDetails /> },
            { path: "/search", element: <Search /> },
            { path: "/contact", element: <Contact /> },
            { path: "/explore", element: <Explore /> },
            { path: "/login", element: <Navigate to="/" /> },
            { path: "/signup", element: <Navigate to="/" /> },
            { path: "/profile", element: <Profile /> },
            { path: "/profile", element: <SignupPage /> },
            { path: "/settings", element: <Settings /> },
          ]
        : [
            { path: "/", element: <Homepage /> },
            { path: "/home", element: <Homepage /> },
            { path: "/recipes", element: <Recipes /> },
            { path: "/recipes/:recipeName", element: <RecipeDetails /> },
            { path: "/search", element: <Search /> },
            {
              path: "/contact",
              element: <Navigate to="/login" />,
            },
            {
              path: "/explore",
              element: <Navigate to="/login" />,
            },
            {
              path: "/login",
              element: (
                <LoginPage
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ),
            },
            {
              path: "/signup",
              element: (
                <SignupPage
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ),
            },
            {
              path: "/profile",
              element: <Navigate to="/login" />,
            },
            {
              path: "/settings",
              element: <Navigate to="/login" />,
            },
          ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

// children: [
//   { path: "/", element: <Homepage /> },
//   { path: "/home", element: <Homepage /> },
//   { path: "/recipes", element: <Recipes /> },
//   { path: "/recipes/:recipeName", element: <RecipeDetails /> },
//   { path: "/search", element: <Search /> },
//   { path: "/contact", element: <Contact /> },
//   { path: "/explore", element: <Explore /> },
//   {
//     path: "/login",
//     element: isLoggedIn ? (
//       <Navigate to="/" />
//     ) : (
//       <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//     ),
//   },
//   {
//     path: "/signup",
//     element: isLoggedIn ? (
//       <Navigate to="/" />
//     ) : (
//       <SignupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//     ),
//   },
//   {
//     path: "/profile",
//     element: isLoggedIn ? <Profile /> : <Navigate to="/login" />,
//   },
//   {
//     path: "/settings",
//     element: isLoggedIn ? <Settings /> : <Navigate to="/login" />,
//   },
// ],

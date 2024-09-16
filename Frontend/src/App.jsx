import SignupPage from "./Pages/SignupPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Explore from "./Pages/Explore.jsx";
import Contact from "./Pages/Contact.jsx";
import Recipes from "./Pages/Recipes.jsx";
import RecipeDetails from "./Pages/RecipeDetails.jsx";
import AddRecipe from "./Pages/AddRecipe.jsx";
import Homepage from "./Pages/HomePage.jsx";
import RootPageLayout from "./Pages/RootPageLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Pages/Search.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Settings from "./Pages/Profile/Settings.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import PrivateRoute from "./Component/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthContext.jsx";
import BookmarkRecipes from "./Pages/BookmarkRecipes.jsx";
import { FavItemsProvider } from "./context/FavContext.jsx";
import { useThemeContext } from "./context/ThemeContext.jsx";
import { useEffect } from "react";
import { RecipeProvider } from "./context/RecipeContext.jsx";

function App() {
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPageLayout />,
      errorElement: <PageNotFound />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/home", element: <Homepage /> },
        { path: "/recipes", element: <PrivateRoute element={Recipes} /> },
        {
          path: "/recipes/:recipeName",
          element: <RecipeDetails />,
        },
        { path: "/search", element: <Search /> },
        { path: "/search/:searchParam", element: <Search /> },
        { path: "/contact", element: <Contact /> },
        { path: "/explore", element: <PrivateRoute element={Explore} /> },
        { path: "/upload", element: <PrivateRoute element={AddRecipe} /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/profile", element: <PrivateRoute element={Profile} /> },
        { path: "/profile/:user", element: <PrivateRoute element={Profile} /> },
        { path: "/settings", element: <PrivateRoute element={Settings} /> },
        {
          path: "/bookmarks",
          element: <PrivateRoute element={BookmarkRecipes} />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RecipeProvider>
        <FavItemsProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            bodyStyle={{ fontSize: ".8rem" }}
          />
        </FavItemsProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;

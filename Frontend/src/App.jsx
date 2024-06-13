import SignupPage from "./Pages/SignupPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Explore from "./Pages/Explore.jsx";
import Contact from "./Pages/Contact.jsx";
import Recipes from "./Pages/Recipes.jsx";
import Homepage from "./Pages/HomePage.jsx";
import RootPageLayout from "./Pages/RootPageLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Pages/Search.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Settings  from "./Pages/Profile/Settings.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPageLayout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/home", element: <Homepage /> },
        { path: "/recipes", element: <Recipes /> },
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

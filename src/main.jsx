import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Home from "./Component/Homepage/Home.jsx";
import Banner from "./Component/Homepage/Banner/Banner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Navbar />
      <Banner />
    </>
  </React.StrictMode>
);

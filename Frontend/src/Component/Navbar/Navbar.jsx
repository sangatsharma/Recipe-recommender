import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 910);
  const { pathname } = useLocation();

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 910);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, pathname]);

  return (
    <>
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
    </>
  );
};

export default Navbar;

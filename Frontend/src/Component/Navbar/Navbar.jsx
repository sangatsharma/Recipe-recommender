import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 910);
  const { pathname } = useLocation().pathname;


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 910);
    window.addEventListener("resize", handleResize);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  return <>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;

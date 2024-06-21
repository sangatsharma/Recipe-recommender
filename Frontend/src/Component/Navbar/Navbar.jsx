import React, { useState, useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 750);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      {/* Other components go here */}
    </div>
  );
};

export default Navbar;

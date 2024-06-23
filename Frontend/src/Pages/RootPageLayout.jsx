import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Wrapper from "../Component/Wrapper";
import Footer from "../Component/Footer";

const RootPageLayout = () => {
  return (
    <div className="root-page-layout">
      <Navbar />
      <div className="content-wrapper">
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
      <Footer />
    </div>
  );
};
export default RootPageLayout;

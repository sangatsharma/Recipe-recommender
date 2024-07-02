import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Wrapper from "../Component/Wrapper";
import Footer from "../Component/Footer";
import { Helmet } from "react-helmet-async";
const RootPageLayout = () => {
  return (
    <div className="root-page-layout">
        <Helmet>
  <title>Cook It Yourself </title>
  </Helmet>
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

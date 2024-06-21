import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Wrapper from "../Component/Wrapper";
import Footer from "../Component/Footer";

const RootPageLayout = () => {
  return (
    <>
      <div className="root-page-layout">
        <Navbar />
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};
export default RootPageLayout;

<div className="flex flex-col min-h-screen">
  {/* Main content of the page */}
  <main className="flex-grow">
    {/* Your main content here */}
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Welcome to Our Site</h1>
      <p>Your content goes here...</p>
    </div>
  </main>
  <Footer />
</div>;

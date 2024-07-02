import InvalidPage from "../Component/InvalidPage";
import Navbar from "../Component/Navbar/Navbar";
import { Helmet } from "react-helmet-async";


const PageNotFound = () => {
  return (
    <>
         <Helmet>
         <title>404 Page not found - CIY </title>
         </Helmet>
      <Navbar />
      <InvalidPage />
    </>
  );
};
export default PageNotFound;

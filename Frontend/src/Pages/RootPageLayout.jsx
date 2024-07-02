import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Wrapper from "../Component/Wrapper";
import Footer from "../Component/Footer";
import { Helmet } from "react-helmet";

const RootPageLayout = () => {
  return (
    <div className="root-page-layout">


<Helmet>
        <title>"Recipes" | Cook It Yourself</title>
        <meta
          property="og:title"
          content={`Checkout this amazing recipe:  from Cook It Yourself.`}
        />
        <meta
          property="og:description"
          content={`A very tasty recipe:  from Cook It Yourself.`}
        />
        <meta property="og:image" content={"https://as1.ftcdn.net/v2/jpg/02/48/92/96/1000_F_248929619_JkVBYroM1rSrshWJemrcjriggudHMUhV.jpg"} />
        <meta
          property="og:url"
          content={`https://recipe-recommender-five.vercel.app/recipes/`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Checkout this amazing recipe from Cook It Yourself.`}
        />
        <meta
          name="twitter:description"
          content={`Checkout this amazing recipe: from Cook It Yourself.`}
        />
        <meta name="twitter:image" content={ "https://as1.ftcdn.net/v2/jpg/02/48/92/96/1000_F_248929619_JkVBYroM1rSrshWJemrcjriggudHMUhV.jpg"} />
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

import * as React from "react";
import { useState } from "react";
import { popularItems } from "./sampleObject.js";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Banner from "./Component/Homepage/Banner/Banner.jsx";
import Wrapper from "./Component/Wrapper.jsx";
import TrendingFoods from "./Component/Homepage/TrendingFoodSection/TrendingFoods.jsx";
import Explore from "./Component/Explore/Explore.jsx";
import Contact from "./Component/Contact/Contact.jsx";
function App() {
  const [selectedPage, setSelectedPage] = useState("Home");
  const Pages = {
    Home: <Banner content={<TrendingFoods items={popularItems} />} />,
    Explore: <Explore />,
    Contact: <Contact />,
  };
  return (
    <>
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <Wrapper selectedPage={selectedPage}>{Pages[selectedPage]}</Wrapper>
    </>
  );
}

export default App;

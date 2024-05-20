import * as React from "react";
import { popularItems } from "./sampleObject.js";
function App() {
  const [selectedPage, setSelectedPage] = useState("Home");
  return (
    <>
      <Navbar />
      <Banner content={<TrendingFoods items={popularItems} />} />
    </>
  );
}

export default App;

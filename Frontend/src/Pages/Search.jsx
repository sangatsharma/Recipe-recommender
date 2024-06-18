import SearchBanner from "../Component/SearchBanner/SearchBanner";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard";
import { useState } from "react";
const Search = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  return (
    <>
      <SearchBanner
        setFoodItems={setFoodItems}
        setSearchPerformed={setSearchPerformed}
        search={search}
        setSearch={setSearch}
      />

      {foodItems.length > 0 && <p className="mb-4">Search Results for {search} : </p>}
      <div className="w-[100%] flex flex-row flex-wrap justify-center gap-2">
        {foodItems.length > 0 &&
          foodItems.map((item) => {
            const regex = /"([^"]+)"/g;
            let matches;
            let urls = [];
            // Loop through all matches
            while ((matches = regex.exec(item.Images)) !== null) {
              urls.push(matches[1]);
            }
            return (
              <ItemsCard
                key={item.RecipeId}
                id={item.RecipeId}
                src={urls[0]}
                name={item.Name}
                rating={item.AggregatedRating}
              ></ItemsCard>
            );
          })}
      </div>
      {searchPerformed && <p>No results found.</p>}
    </>
  );
};
export default Search;

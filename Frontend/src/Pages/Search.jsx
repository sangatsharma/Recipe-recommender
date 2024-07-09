import SearchBanner from "../Component/SearchBanner/SearchBanner";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard";
import { useState } from "react";
import { useFavContext } from "../context/FavContext";
import { Helmet } from "react-helmet-async";



const Search = () => {
  const { tickedItems, toggleTick } = useFavContext();
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  return (
    <>
      <Helmet>
        <title>Search - CIY </title>
      </Helmet>

      <div className="flex flex-col  m-auto gap-2 ">
        <SearchBanner
          setFoodItems={setFoodItems}
          setSearchPerformed={setSearchPerformed}
          search={search}
          setSearch={setSearch}
        />

        {foodItems.length > 0 && (
          <p className="mb-4 text-center">Search Results for {search} : </p>
        )}
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
                  RecipeCategory={item.RecipeCategory}
                  cooktime={item.CookTime}
                  isFavorite={tickedItems.has(item.RecipeId)}
                  toggleTick={toggleTick}
                ></ItemsCard>
              );
            })}
        </div>
        {searchPerformed && foodItems.length === 0 && (
          <p className="mt-2 text-center">No results found.</p>
        )}
      </div>
    </>
  );
};
export default Search;

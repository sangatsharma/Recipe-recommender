import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import SearchBanner from "../Component/SearchBanner/SearchBanner";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard";
import { useFavContext } from "../context/FavContext";
import { rankFoodItems } from "../utils/filterItems";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickedItems, toggleTick } = useFavContext();

  const [fetchItems, setFetchItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeFilter, setActiveFilter] = useState(["Recipes"]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Extract parameters
    const searchValue = searchParams.get("search");
    const filterType = searchParams.get("filterType");
    const filters = searchParams.getAll("filter");

    // Update state with extracted parameters
    setSearch(searchValue || "");
    setActiveFilter([
      filterType || "Recipes",
      ...filters.map((filter) => {
        const [key, value] = filter.split(":");
        return { [key]: value };
      }),
    ]);

    if (searchValue) {
      fetchAndProcessItems(searchValue);
    }
  }, [location.search]);

  const fetchAndProcessItems = async (search) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipe`,
        { withCredentials: true }
      );
      const items = response.data;
      const rankedItems = rankFoodItems(items, search);
      setFetchItems(rankedItems);
    } catch (error) {
      console.error("Error fetching or processing items:", error);
    }
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }
    if (search === prevSearch) {
      return;
    }

    // Disable the button to prevent rapid presses
    setIsButtonDisabled(true);
    // Re-enable the button after 5 seconds to allow the user to search again
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);

    setSearchPerformed(true);
    setPrevSearch(search);
    fetchAndProcessItems(search);

    // Construct the URL with updated search parameters
    const url = `/search?search=${encodeURIComponent(
      search
    )}&filterType=${encodeURIComponent(activeFilter[0])}&${activeFilter
      .slice(1)
      .map(
        (filter) =>
          `filter=${encodeURIComponent(
            Object.keys(filter)[0]
          )}:${encodeURIComponent(Object.values(filter)[0])}`
      )
      .join("&")}`;
    navigate(url);
  };

  return (
    <>
      <Helmet>
        <title>Search - CIY</title>
        <meta name="description" content={`Search results for ${search}`} />
      </Helmet>

      <div className="flex flex-col m-auto gap-2">
        <SearchBanner
          setFetchItems={setFetchItems}
          setSearchPerformed={setSearchPerformed}
          search={search}
          setSearch={setSearch}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleSearch={handleSearch}
          isButtonDisabled={isButtonDisabled}
          setPrevSearch={setPrevSearch}
        />

        {fetchItems.length > 0 && (
          <p className="mb-4 text-center" aria-live="polite">
            Search Results for {search}:
          </p>
        )}

        <div className="w-[100%] flex flex-row flex-wrap justify-center gap-2">
          {fetchItems.length > 0 &&
            (activeFilter.includes("Recipes") ||
              activeFilter.includes("Ingredients")) &&
            fetchItems.map((item) => {
              const regex = /"([^"]+)"/g;
              let matches;
              let urls = [];
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
                />
              );
            })}
        </div>

        {searchPerformed && fetchItems.length === 0 && (
          <p className="mt-2 text-center" aria-live="assertive">
            No results found.
          </p>
        )}
      </div>
    </>
  );
};

export default Search;

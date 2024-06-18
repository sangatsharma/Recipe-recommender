import SearchBanner from "../Component/SearchBanner/SearchBanner";
import Wrapper from "../Component/Wrapper";
import ItemsCard from "../Component/Homepage/TrendingFoodSection/ItemsCard";
import { useState } from "react";
const Search = (props) => {
  const [foodItems, setFoodItems] = useState([]);

  return (
    <>
      <SearchBanner foodItems={foodItems} setFoodItems={setFoodItems} />

      {foodItems.length > 0 && <h1>Search Results:</h1>}
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
              <>
                <ItemsCard
                  key={item.RecipeId}
                  id={item.RecipeId}
                  src={urls[0]}
                  name={item.Name}
                  rating={item.AggregatedRating}
                ></ItemsCard>
              </>
            );
          })}
      </div>
      {foodItems.length === 0 && <h1>No results found</h1>}
    </>
  );
};
export default Search;

// Sample data
// const foodItems = [
//     { name: "Chicken Curry", keywords: ["Meat", "Nepalese", "Asian", "< 60 Mins"] },
//     { name: "Vegetable Stir Fry", keywords: ["Vegetarian", "Asian", "< 30 Mins"] },
//     { name: "Momo", keywords: ["Meat", "Nepalese", "Asian", "< 60 Mins"] },
//     { name: "Samosa", keywords: ["Vegetarian", "Indian", "< 60 Mins"] }
// ];

// // Optional synonyms map
// const synonyms = {
//     "nepali": "nepalese",
//     "fast": "< 30 mins",
//     "quick": "< 30 mins",
//     "slow": "> 60 mins"
// };

// // Function to normalize and handle synonyms
// function normalizeKeyword(keyword) {
//     const lowerKeyword = keyword.toLowerCase();
//     return synonyms[lowerKeyword] || lowerKeyword;
// }

// // Function to rank food items based on keyword match
// function rankFoodItems(foodItems, searchText) {
//     searchText = searchText.trim();

//     if (!searchText) {
//         // If search text is empty, return all items with a score of 0
//         return foodItems.map(item => ({ ...item, score: 0 }));
//     }

//     // Convert the search text to normalized keywords
//     const searchKeywords = searchText.toLowerCase().split(/\s+/).map(normalizeKeyword);

//     // Rank food items based on the number of matched keywords
//     const rankedItems = foodItems.map(item => {
//         // Calculate score as the number of matched keywords
//         const score = searchKeywords.reduce((count, keyword) =>
//             item.keywords.map(normalizeKeyword).includes(keyword) ? count + 1 : count
//         , 0);

//         return { ...item, score };
//     });

//     // Sort items by score in descending order
//     rankedItems.sort((a, b) => b.score - a.score);

//     return rankedItems;
// }

// // Example usage
// const searchText = "Meat Asian quick";
// const rankedItems = rankFoodItems(foodItems, searchText);

// // Output the results
// rankedItems.forEach(item => console.log(`${item.name} (Score: ${item.score})`));

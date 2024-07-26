// Optional synonyms map
const synonyms = {
  nepali: "nepalese",
  fast: "< 30 mins",
  quick: "< 30 mins",
  slow: "> 60 mins",
  lamb: "goat",
  potatoes: "potato",
  tomatoes: "tomato",
};
// Function to normalize and handle synonyms
function normalizeKeyword(Keywords) {
  const lowerKeyword = Keywords.toLowerCase();
  return synonyms[lowerKeyword] || lowerKeyword;
}

// Function to rank food items based on keyword match
export function rankFoodItems(foodItems, searchText, activeFilter) {
  let searchKeywords = [];
  const checkSearchText = searchText.trim();
  if (!checkSearchText) {
    // If search text is empty, return all items with a score of 0
    return [];
  }

  if (activeFilter.includes("Recipes")) {
    // Convert the search text to normalized keywords
    searchKeywords = searchText
      .toLowerCase()
      .split(/\s+/)
      .map(normalizeKeyword);

    // Rank food items based on the number of matched keywords
    const rankedItems = foodItems.map((item) => {
      const combineKeywords = [
        ...convertToKeywordArray(item.Keywords),
        ...item.Name.split(" "),
      ];
      combineKeywords.push(item.RecipeCategory);
      // Calculate score as the number of matched keywords
      const score = searchKeywords.reduce(
        (count, keyword) =>
          combineKeywords.map(normalizeKeyword).includes(keyword)
            ? count + 1
            : count,
        0
      );

      return { ...item, score };
    });
    //   rankedItems.forEach(item => console.log(`${item.Name} (Score: ${item.score})`));
    // Sort items by score in descending order
    const filteredItems = rankedItems.filter((item) => item.score > 0);
    filteredItems.sort((a, b) => b.score - a.score);

    return filteredItems;
  }

  // For filter type Ingredients
  if (activeFilter.includes("Ingredients")) {
    const searchIngredients = searchText
      .toLowerCase()
      .split(",")
      .map(normalizeKeyword);
    // Rank food items based on the number of matched keywords
    const rankedItems = foodItems.map((item) => {
      const combineKeywords = convertToKeywordArray(item.RecipeIngredientParts);
      let matchedIngredients = [];
      // Calculate score as the number of matched keywords
      const score = searchIngredients.reduce((count, ingredient) => {
        if (combineKeywords.map(normalizeKeyword).includes(ingredient)) {
          matchedIngredients.push(Object.keys(synonyms).find(key => synonyms[key] === ingredient) || ingredient);
          return count + 1;
        }
        return count;
      }, 0);

      return { ...item, score, matchedIngredients };
    });
    //   rankedItems.forEach(item => console.log(`${item.Name} (Score: ${item.score})`));
    // Sort items by score in descending order
    const filteredItems = rankedItems.filter((item) => item.score > 0);
    filteredItems.sort((a, b) => b.score - a.score);

    return filteredItems;
  }
}

function convertToKeywordArray(input) {
  // Remove the leading "c(" and trailing ")"
  let trimmedInput = input.slice(2, -1);

  // Remove the \" symbols and split by comma
  let keywords = trimmedInput
    .split(/"\s*,\s*"/) // Split by "\", \" (ignoring spaces)
    .map((keyword) => keyword.replace(/"/g, "").trim()); // Remove remaining quotes and trim

  return keywords;
}

// Optional synonyms map
const synonyms = {
  nepali: "nepalese",
  fast: "< 30 mins",
  quick: "< 30 mins",
  slow: "> 60 mins",
  mutton: "goat",
  lamb: "goat",
  rice:"bhat",
  potatoes: "potato",
  tomatoes: "tomato",
  pickel: "chutney",
  achar: "chutney",
};
// Function to normalize and handle synonyms
function normalizeKeyword(Keywords) {
  if (!Keywords) return "";
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
      const combineKeywords = [...item.Keywords, ...item.Name.split(" ")];
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
      let matchedIngredients = [];
      // Calculate score as the number of matched keywords
      const score = searchIngredients.reduce((count, ingredient) => {
        if (
          item.RecipeIngredientParts.map(normalizeKeyword).includes(ingredient)
        ) {
          matchedIngredients.push(
            Object.keys(synonyms).find((key) => synonyms[key] === ingredient) ||
              ingredient
          );
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
  return [];
}

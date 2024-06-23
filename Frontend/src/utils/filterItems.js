// Function to normalize and handle synonyms
function normalizeKeyword(Keywords) {
  // Optional synonyms map
  const synonyms = {
    nepali: "nepalese",
    fast: "< 30 mins",
    quick: "< 30 mins",
    slow: "> 60 mins",
    lamb: "goat",
  };

  const lowerKeyword = Keywords.toLowerCase();
  return synonyms[lowerKeyword] || lowerKeyword;
}

// Function to rank food items based on keyword match
export function rankFoodItems(foodItems, searchText) {
  searchText = searchText.trim();

  if (!searchText) {
    // If search text is empty, return all items with a score of 0
    return [];
  }

  // Convert the search text to normalized keywords
  const searchKeywords = searchText
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
      (count, keywords) =>
        combineKeywords.map(normalizeKeyword).includes(keywords)
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

function convertToKeywordArray(input) {
  // Remove the leading "c(" and trailing ")"
  let trimmedInput = input.slice(2, -1);

  // Remove the \" symbols and split by comma
  let keywords = trimmedInput
    .split(/"\s*,\s*"/) // Split by "\", \" (ignoring spaces)
    .map((keyword) => keyword.replace(/"/g, "").trim()); // Remove remaining quotes and trim

  return keywords;
}

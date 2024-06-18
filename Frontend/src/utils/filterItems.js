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
// const input = 'c("Meat", "Nepalese", "Asian", "< 60 Mins")';
// const keywords = convertToKeywordArray(input);
// console.log(keywords); // Output: ["Meat", "Nepalese", "Asian", "< 60 Mins"]

export const recipes = [
  {
    RecipeId: 1,
    Name: "Nepali Momo (Nepalese Meat Dumplings)",
    AuthorId: 1,
    CookTime: 45,
    PrepTime: 15,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:21.021Z",
    Description:
      "This stuffed dumpling preparation is one of the most popular dishes in Nepal. This dish is an example of Tibetan influence in Nepali cuisine.",
    Images:
      'c("https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/6/pic6EgRr7.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/6/JdWy2qdS5yQ5cSR2ECjs_momo2.jpeg", "https://img.sndimg.com/food/image/upload/v1/img/feed/86666/0G3pdPt6QMWb3yN4lrFT_85D3DBA4-4252-4B3D-A2E2-1A76BDC17856.jpeg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/6/bFaNudmQQLSXNUCKpxWM_image2.jpeg", \n"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/6/nZBX9X1aQ9C4rdzyaUgB_image1.jpeg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/6/picSITPgS.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/6/picfLLV4C.jpg")',
    RecipeCategory: "Lamb/Sheep",
    Keywords: 'c("Meat", "Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("all-purpose flour", "water", "salt", "red onion", "green onion", "tomatoes", "fresh cilantro", "fresh garlic", "fresh ginger", "nutmeg", "turmeric", "curry powder", "red chilies")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "628.4",
    FatContent: "15.4",
    SaturatedFatContent: "2.1",
    CholesterolContent: "0",
    SodiumContent: "52",
    CarbohydrateContent: "107",
    FiberContent: "6.1",
    SugarContent: "5.5",
    ProteinContent: "15",
    RecipeInstructions:
      'c("Dough: In a large bowl combine flour, oil, salt and water.", "Mix well, knead until the dough becomes homogeneous in texture, about 8-10 minute.", "Cover and let stand for at least 30 minute.", "Knead well again before making wrappers.", "Filling: In a large bowl combine all filling ingredients.", "Mix well, adjust for seasoning with salt and pepper.", "Cover and refrigerate for at least an hour to allow all ingredients to impart their unique flavors.", "This also improves the consistency of the filling.", \n"Assembly:", "Give the dough a final knead.", "Prepare 1-in. dough balls.", "Take a ball, roll between your palms to spherical shape.", "Dust working board with dry flour.", "On the board gently flatten the ball with your palm to about 2-in circle.", "Make a few semi-flattened circles, cover with a bowl.", "Use a rolling pin to roll out each flattened circle into a wrapper.", "For well executed MOMO\'s, it is essential that the middle portion of the wrapper be slightly thicker than the edges to ensure the structural integrity of dumplings during packing and steaming.", \n"Hold the edges of the semi-flattened dough with one hand and with the other hand begin rolling the edges of the dough out, swirling a bit at a time.", "Continue until the wrapper attains 3-in diameter circular shape.", "Repeat with the remaining semi-flattened dough circles.", "Cover with bowl to prevent from drying.", "For packing hold wrapper on one palm, put one tablespoon of filling mixture and with the other hand bring all edges together to the center, making the pleats.", "Pinch and twist the pleats to ensure the absolute closure of the stuffed dumpling.", \n"This holds the key to good tasting, juicy dumplings.", "Heat up a steamer, oil the steamer rack well.", "This is critical because it will prevent dumplings from sticking.", "Arrange uncooked dumplings in the steamer.", "Close the lid, and allow steaming until the dumplings are cooked through, about 10 minutes.", "Take dumplings off the steamer and serve immediately.", "Alternatively, you can place uncooked dumplings directly in slightly salted boiling water and cook until done, approximately 10 minutes.  Be careful not to over boil the dumplings.", \n"You may also slightly sauté cooked dumplings in butter before serving.", "To serve, arrange the cooked dumplings (MOMO\'s) on serving plate with hot tomato achar or any other chutneys as condiment.")',
  },
  {
    RecipeId: 2,
    Name: "Lamb Bhutuwa (Nepali Lamb Stir-Fried in Himalayan Spices)",
    AuthorId: 1,
    CookTime: 15,
    PrepTime: 30,
    TotalTime: 45,
    DatePublished: "2024-06-18T10:27:21.364Z",
    Description:
      "This is a spicy stir-fry preparation in Nepali style using lamb. Chicken, pork or beef could also be used.",
    Images:
      'c("https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/7/picL0EvuX.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/66/7/picLYLnl3.jpg")',
    RecipeCategory: "Lamb/Sheep",
    Keywords: 'c("Meat", "Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("boneless lamb", "onion", "garlic cloves", "gingerroot", "red chilies", "turmeric", "asafoetida powder", "cumin powder", "curry powder", "green onion", "green peas", "lemon juice", "broth", "water")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "1629.6",
    FatContent: "126.8",
    SaturatedFatContent: "46.9",
    CholesterolContent: "327",
    SodiumContent: "968.5",
    CarbohydrateContent: "36",
    FiberContent: "8.3",
    SugarContent: "14.5",
    ProteinContent: "85.4",
    RecipeInstructions:
      'c("In a large bowl, combine two tablespoons of oil, one tablespoon of lemon juice, 1/2 teaspoon of turmeric, salt and pepper into a paste.", "Add lamb pieces and mix thoroughly to coat; cover, and let marinate for 30 minutes.", "After marinating, drain the marinade and pat-dry lamb pieces.", "In a processor, blend chopped onion, garlic, ginger, fresh red chilies, cumin and curry powder, asafetida, and turmeric into a smooth paste.", "In a non-stick pan heat two tablespoons of oil.", "Add dried red chilies and fry till dark.", \n"Add spice paste; fry for another few minutes until the oil starts to separate from the spices.", "Transfer marinated lamb to the pan, add salt and pepper and stir well to brown on high heat.", "Reduce the heat to medium and continue to stir fry lamb until cooked tender.", "It may require some broth or water to moisten, if it starts to burn.", "Add green peas and green onions; stir for another two minutes.", "Adjust seasoning with salt and pepper.", "Drain excess oil, if necessary.", "Serve with stir-fried vegetables and rice or roti (flat bread)."\n)',
  },
  {
    RecipeId: 3,
    Name: "Lamb Sukuti (Crispy Smoked Lamb Marinated in Nepali Spices)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 120,
    TotalTime: 150,
    DatePublished: "2024-06-18T10:27:21.523Z",
    Description:
      "This is a spicy preparation which consists of thinly sliced smoked meat marinated in Himalayan spices.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/73/6/xKTxUbBUQL6cUpk1qyWb_Lamb%20Sukuti.jpg"',
    RecipeCategory: "Lamb/Sheep",
    Keywords: 'c("Meat", "Nepalese", "Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("boneless lamb", "shallot", "cumin powder", "ginger paste", "garlic paste", "turmeric", "molasses")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "2062.2",
    FatContent: "160.9",
    SaturatedFatContent: "66.2",
    CholesterolContent: "489.9",
    SodiumContent: "598.3",
    CarbohydrateContent: "30.7",
    FiberContent: "0.3",
    SugarContent: "16.8",
    ProteinContent: "116.2",
    RecipeInstructions:
      'c("In a blender, combine chopped onions, cumin, ginger, garlic, chili, timur, turmeric, molasses, honey, oil, salt and pepper into a smooth paste.", "In a large bowl, combine lamb pieces with the spice mixture; mix well, cover and let marinate for at least two hours.", "Fire up a charcoal grill and place the marinated lamb slices on the grill, further away from direct fire.", "Allow smoking for about an hour, or until the slices are cooked and slightly crisp.", "Serve with rice pilaf and stir-fried vegetables, accompanied with mango chutney."\n)',
  },
  {
    RecipeId: 4,
    Name: "Lamb Pakuwa (Nepali Slow-Cooked Dry Lamb Curry)",
    AuthorId: 1,
    CookTime: 60,
    PrepTime: 15,
    TotalTime: 75,
    DatePublished: "2024-06-18T10:27:21.682Z",
    Description:
      "Make and share this Lamb Pakuwa (Nepali Slow-Cooked Dry Lamb Curry) recipe from Food.com.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/80/1/TYAorPlNSBGhLbpo7TvA_Lamb%20Pakuwa.jpg"',
    RecipeCategory: "Lamb/Sheep",
    Keywords: 'c("Meat", "Nepalese", "Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("boneless lamb", "onion", "tomatoes", "cumin powder", "garlic", "gingerroot", "szechwan pepper", "turmeric", "brown sugar", "fresh cilantro", "cumin seed", "broth", "water", "scallion")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "1645",
    FatContent: "133.4",
    SaturatedFatContent: "47.7",
    CholesterolContent: "327",
    SodiumContent: "967.4",
    CarbohydrateContent: "29",
    FiberContent: "4.4",
    SugarContent: "15.7",
    ProteinContent: "81",
    RecipeInstructions:
      'c("In a blender, process chopped onions, tomatoes, cumin powder, chili, garlic, ginger, timur, turmeric, brown sugar and chopped cilantro into a smooth paste.", "Combine lamb cubes with the marinating paste and marinate for at least four hours.", "In a saucepan, heat three tablespoons of oil, add the marinated lamb pieces together with the marinade.", "Cook covered in low heat, frequently stirring, until the lamb is tender and all liquid has evaporated.", "The key is to ensure that the curry is cooked tender and completely dry at this stage.", \n"Reserve in a large plate.", "In a sauté pan, heat the remaining two tablespoons of oil.", "Add dried red chilies and cumin seeds; fry until dark.", "To the oil mixture, add chopped scallions and fry for a minute or so.", "To the oil mixture, add the curried lamb and brown well.", "Serve with rice pilaf or roti (flat bread).")',
  },
  {
    RecipeId: 5,
    Name: "Chicken Sekuwa (Classic Nepali Chicken Skewers)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:21.835Z",
    Description:
      "Make and share this Chicken Sekuwa (Classic Nepali Chicken Skewers) recipe from Food.com.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/98/4/BPusHQbQ5uOQ0LoXbm7B_Chicken%20Sekuwa.jpg"',
    RecipeCategory: "Chicken Breast",
    Keywords:
      'c("Chicken", "Lamb/Sheep", "Poultry", "Meat", "Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("boneless chicken breasts", "chicken thighs", "butter", "curry powder", "red chilies", "fresh cilantro", "lemongrass", "lime zest", "turmeric", "nutmeg", "szechwan pepper", "yogurt", "garlic paste", "ginger paste")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "614.8",
    FatContent: "34.4",
    SaturatedFatContent: "9.6",
    CholesterolContent: "199",
    SodiumContent: "214.9",
    CarbohydrateContent: "8",
    FiberContent: "1.3",
    SugarContent: "4.4",
    ProteinContent: "65.7",
    RecipeInstructions:
      'c("In a blender, process all marinating ingredients into a smooth paste.", "Marinate chicken cubes in marinade for overnight in the refrigerator.", "Pat dry marinated chicken pieces and thread on with soaked bamboo skewers.", "Grill to the desired doneness, frequently turning and basting with the melted butter.", "Serve hot with rice pilaf and stir-fried vegetables, accompanied by tomato achar.")',
  },
  {
    RecipeId: 6,
    Name: "Duck Tareko (Crispy Deep-Fried Duck Marinated in Nepali Spices)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 60,
    TotalTime: 90,
    DatePublished: "2024-06-18T10:27:21.999Z",
    Description:
      "Make and share this Duck Tareko (Crispy Deep-Fried Duck Marinated in Nepali Spices) recipe from Food.com.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/86/98/5/pictPk049.jpg"',
    RecipeCategory: "Whole Duck",
    Keywords: 'c("Duck", "Poultry", "Meat", "Nepalese", "Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("duck", "cumin powder", "ginger paste", "garlic paste", "szechwan pepper", "nutmeg", "turmeric", "molasses", "honey")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "4737.8",
    FatContent: "447.6",
    SaturatedFatContent: "150.2",
    CholesterolContent: "862.6",
    SodiumContent: "730.6",
    CarbohydrateContent: "37.4",
    FiberContent: "1.1",
    SugarContent: "28.8",
    ProteinContent: "131.6",
    RecipeInstructions:
      'c("In a small bowl, combine cumin, ginger, garlic, timur, nutmeg, half teaspoon of turmeric, salt and pepper; mix well.", "Clean duck; wipe dry.", "Rub duck inside and out with the spice mixture.", "Let rest to marinate for at least eight hours.", "Place marinated duck in a steamer and steam for at least one hour.", "Remove from steamer and let cool down.", "Combine a half teaspoon of turmeric, chili paste, molasses, honey and salt, and smother over the duck, inside and out.", "In a deep fryer heat oil to 360F.", \n"Dip the steamed duck in frying oil.", "Fry duck, turning periodically, until the duck skin is golden brown and crispy.", "Remove from oil and place on paper towel to absorb excess oil.", "To serve, cut crispy duck into bite-size pieces.", "Serve with rice pilaf, accompanied with mango chutney.")',
  },
  {
    RecipeId: 7,
    Name: "Fish Poleko (Nepali Spicy Fish Grilled in Banana Leaf)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:22.160Z",
    Description:
      "Make and share this Fish Poleko (Nepali Spicy Fish Grilled in Banana Leaf) recipe from Food.com.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/87/24/2/55UGsokzSNSNl11QP510_Fish%20Poleko.jpg"',
    RecipeCategory: "Trout",
    Keywords: 'c("Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("trout", "lemon wedge", "cumin powder", "yellow mustard seeds", "red chilies", "turmeric", "nutmeg", "szechwan pepper", "lemon juice", "garlic paste", "ginger paste")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "1215.4",
    FatContent: "61.2",
    SaturatedFatContent: "9.8",
    CholesterolContent: "394.4",
    SodiumContent: "366.9",
    CarbohydrateContent: "15.4",
    FiberContent: "3.1",
    SugarContent: "6.9",
    ProteinContent: "145.2",
    RecipeInstructions:
      'c("In a blender combine all marinating ingredients into a smooth paste.", "Prepare a grill with glowing charcoal and wood chips.", "Trim and score the fish to form deep packets on all sides.", "Salt and pepper the fish first and smother with the marinating paste, inserting deep into the packets.", "Oil the banana leaf; gently heat up the banana leaf on the grill for a brief time, for it makes the banana leaf softer and workable.", "Immediately place the fish on the banana leaf and wrap in by ensuring a complete closure.", \n"Secure it with bamboo picks or a twain.", "Place the wrapped fish on grill and smoke-grill for 20-30 minutes, turning frequently.", "Once cooked, unwrap the banana leaf and put the fish on the bed of rice pilaf to serve, topped with tomato achar.", "Garnish with a fresh squeeze of lemon wedges.")',
  },
  {
    RecipeId: 8,
    Name: "Roti (Nepali Non-Leavened Whole Wheat Flat Bread)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 15,
    TotalTime: 45,
    DatePublished: "2024-06-18T10:27:22.318Z",
    Description:
      "Make and share this Roti (Nepali Non-Leavened Whole Wheat Flat Bread) recipe from Food.com.",
    Images: "character(0)",
    RecipeCategory: "Breads",
    Keywords: 'c("Nepalese", "Asian", "Low Cholesterol", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("whole wheat flour", "butter", "warm water", "sugar", "salt", "butter")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "568.9",
    FatContent: "20.3",
    SaturatedFatContent: "11.5",
    CholesterolContent: "45.8",
    SodiumContent: "738.2",
    CarbohydrateContent: "88.5",
    FiberContent: "12.8",
    SugarContent: "2.6",
    ProteinContent: "16",
    RecipeInstructions:
      'c("In a large bowl, combine the flour, melted butter, salt and sugar.", "Make a well in the center and add warm water, mixing it with the flour until a soft dough is formed. You can add more water if the dough is too firm. You can add more flour if the dough is too soft. You don\'t want an overly soft dough for rotis.", "Dust kneading board with flour; place the dough on the board and knead for 5 minutes or so until the dough becomes smooth in texture.", "Cover with plastic wrap and let rest for an hour or so.", \n"Divide the dough into 6 round balls, roughly an inch and a half to two inches in diameter.", "Roll out the dough balls with a rolling pin into thin 6-7 inch circles. The key to perfectly-made rotis is to roll out the balls as thin as practical over a dusted surface. The thinner the rotis, the sharper the taste. It is better to prepare two or three circles at a time. Cover with plastic wrap.", "Heat a flat-bottomed non-stick pan or cast-iron skillet on medium-high heat.", "Place one roti on the pan, top-side down and cook for 30 seconds or so.", \n"Turn over and cook for another minute until small air pockets emerge.", "Turn it over once more and cook for another minute.", "With a lightly-wet towel, press on the roti, forcing it to develop more air pockets.", "Brush cooked roti with melted butter, or extra virgin olive oil if desired, when cooked, typically only on one side and transfer it to an aluminum foil or container or warm towel to keep your rotis warm until served.", "Serve hot with vegetable or meat preparations.")',
  },
  {
    RecipeId: 9,
    Name: "Selroti (Rice Donut, Nepali Style)",
    AuthorId: 1,
    CookTime: 60,
    PrepTime: 30,
    TotalTime: 90,
    DatePublished: "2024-06-18T10:27:22.481Z",
    Description:
      "This is a donut-like preparation made from ground rice and nuts. This is mainly served in Nepali festivals.",
    Images: "character(0)",
    RecipeCategory: "Dessert",
    Keywords:
      'c("Cookie & Brownie", "Long Grain Rice", "Rice", "Nepalese", "Asian", "Low Protein", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("basmati rice", "butter", "sugar", "vanilla extract", "ground cardamom", "cashew nuts", "coconut", "salt", "powdered sugar")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "1685.5",
    FatContent: "156.1",
    SaturatedFatContent: "50.1",
    CholesterolContent: "153.7",
    SodiumContent: "703.6",
    CarbohydrateContent: "69.1",
    FiberContent: "2.8",
    SugarContent: "24.9",
    ProteinContent: "8.6",
    RecipeInstructions:
      'c("In a blender, grind soaked rice, grated coconut, almond and cashew nuts into a coarse paste.", "In a large bowl, combine ground rice, butter and sugar; mix well.", "Add vanilla extract and salt; incorporate well.", "Start adding milk gradually to the rice-butter mixture, constantly stirring.", "The end result should yield a batter with consistency similar to that for pancakes.", "Heat oil.", "Pour some of the batter into a baking pipe.", "Pipe out the mixture into oil so that you have created an enclosed circle.", \n"Allow frying until the oil side of Selroti is golden brown; turn over on the other side.", "Remove from oil once both sides are cooked to golden brown and crispy.", "Place on a sheet of paper towel to absorb excess oil.", "Continue frying until all the batter is finished.", "To serve, place two Selrotis on a plate; dust them with powdered sugar.")',
  },
  {
    RecipeId: 10,
    Name: "Mango Chutney (Nepali Spiced Chutney with Ripe Mango)",
    AuthorId: 1,
    CookTime: 45,
    PrepTime: 30,
    TotalTime: 75,
    DatePublished: "2024-06-18T10:27:22.641Z",
    Description:
      "This Nepali chutney is universally used as condiment with sekuwas (grilled skewers), sukutis (smoked roasted meats), roast duck, etc.",
    Images: "character(0)",
    RecipeCategory: "Mango",
    Keywords: 'c("Tropical Fruits", "Fruit", "Nepalese", "Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("mangoes", "tamarind paste", "brown sugar", "red chilies", "garlic", "ginger", "cumin seed", "szechwan pepper", "asafoetida powder", "salt")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "292",
    FatContent: "3.4",
    SaturatedFatContent: "0.5",
    CholesterolContent: "0",
    SodiumContent: "25.9",
    CarbohydrateContent: "68.1",
    FiberContent: "3",
    SugarContent: "62",
    ProteinContent: "1.8",
    RecipeInstructions:
      'c("In a sauce pan, heat oil; splitter cumin seeds until dark brown.", "Add chilies, garlic, ginger, timur, asafetida, and salt.", "Fry for a minute or so.", "Add mango chunks, tamarind paste and brown sugar.", "Mix all ingredients well and allow simmering in low heat for about 30 minutes, or until mango chunks are tender.", "Remove from heat and let rest to cool.", "Puree the mango mixture into a smooth paste-like mixture.", "Put in a sterilized, air tight jar and refrigerate.")',
  },
  {
    RecipeId: 11,
    Name: "Stuffed Chatamari  (Nepali Stuffed Rice Crepes)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:22.799Z",
    Description:
      "This is an excellent savory appetizer made of rice pancakes and stuffed with or without vegetarian or non-vegetarian mixture. Original recipe does not normally call for soaked lentils, but the addition thatof takes this preparation to another level.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/10/00/16/uFJMqajXTMektDP6qf4L_Stuffed%20Chatamari.jpg"',
    RecipeCategory: "Nepalese",
    Keywords: 'c("Asian", "Low Cholesterol", "Healthy", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("long-grain rice", "black lentils", "lentils", "ginger", "green chilies", "salt", "water", "red bell pepper", "celery", "scallion", "garlic", "ginger", "green chilies", "fresh tomato")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "647.3",
    FatContent: "13.7",
    SaturatedFatContent: "2.1",
    CholesterolContent: "31.8",
    SodiumContent: "67.9",
    CarbohydrateContent: "100.1",
    FiberContent: "18.4",
    SugarContent: "6.1",
    ProteinContent: "30.4",
    RecipeInstructions:
      'c("For rice crepes, soak rice and the lentils in water overnight.", "Rinse the soaked rice and lentils mixture thoroughly.", "In a blender, combine the soaked rice and lentil mixture, ginger and chilies, and water to form a smooth batter-like paste.", "Pour into a large mixing bowl; add salt to taste; mix thoroughly.", "You may need to add more water if necessary to achieve the consistency similar to crepe mixture.", "Let the batter rest for at least six hours in the refrigerator.", "To prepare rice crepes, in a non-stick frying pan heat a tablespoon of clarified butter over medium-low heat.", \n"Pour in some batter and spread out into a paper-thin crepe.", "Cook until the bottom has crisped up; turn over and cook the other side.", "Remove the cooked crepe and reserve in a container with tight lid.", "Repeat with the remaining batter.", "For stuffing, heat oil in a non-stick sauté pan; fry garlic and ginger until light brown.", "Put in minced meat, salt and pepper.", "Brown the meat and add chopped bell pepper, celery, minced chilies, chopped tomatoes, and chopped scallion.", "Stir in for a few of minutes in low heat until all ingredients are cooked.", \n"Adjust seasoning with salt and pepper.", "Reserve in a large plate to cool.", "On a large plate, put a rice crepe and brush on lightly with some clarified butter.", "Place one and half tablespoons of stuffing mixture in the middle of the crepe and spread out across the middle.", "Fold one edge over the mixture and roll up.", "Repeat with the other pancakes.", "Arrange them in a large plate, topped with achar to serve.")',
  },
  {
    RecipeId: 12,
    Name: "Nepali Chicken (Pakistani Style)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 20,
    TotalTime: 50,
    DatePublished: "2024-06-18T10:27:22.962Z",
    Description:
      "My mother's own modified version of the classic Nepali dish. Serve as lunch or dinner, with or without gravy and ingredients you might just have in your fridge.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/19/04/06/picJpgves.jpg"',
    RecipeCategory: "Curries",
    Keywords:
      'c("One Dish Meal", "Chicken Breast", "Chicken Thigh & Leg", "Chicken", "Poultry", "Meat", "Nepalese", "Asian", "Spicy", "Savory", "< 60 Mins", "Steam", "Stir Fry", "Easy", "Inexpensive")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("chicken", "onion", "red capsicums", "tomatoes", "yogurt", "ginger paste", "gingerroot", "garlic paste", "garlic cloves", "salt", "pepper", "coriander powder", "cumin seed")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "939",
    FatContent: "68",
    SaturatedFatContent: "16.5",
    CholesterolContent: "232",
    SodiumContent: "1402",
    CarbohydrateContent: "21.1",
    FiberContent: "5.1",
    SugarContent: "12",
    ProteinContent: "60.9",
    RecipeInstructions:
      'c("Marinate the chicken mixing your pieces with 1 Tablespoon yougurt, 1 Teaspoon garlic paste or chopped, and salt+pepper.", "Place this mixture in a fridge for 30 minutes.", "Chop Onions, Capsicums and 1 tomato in cubes. Pour 1 tablespoon cooking oil in a pan with lid, fry these vegetables on low heat for 30 minutes.", "Add a pinch of pepper and cover the pan for best \\"steamed\\" results. Leave these on heat and proceed to the next steps.", "After the chicken is marinated, fry it to a golden brown. Drain and leave aside.", \n"In another pan, heat a tablespoon of cooking oil, fry 1 peeled, deseeded and slightly crushed tomato.", "After 1 minute, add 1 teaspoon garlic paste or chopped garlic, 1/2 teaspoon cumin seeds, and 1 teaspoon corriander powder. Fry this mixture for at least 5 minutes.", "Add 3 tablespoons of yogurt. If you like a lot of gravy, then you can add more yogurt. But if you prefer dry chicken, then 3 is enough.", "Add your already fried chicken to this mixture.", "Let this cook until the oil appears on the edges of the pan or when gravy thickens.", \n"Now add this cooked mixture on top of the bed of onions, capsicums and tomatoes in the other pan which is already on low heat. No need to mix everything.", "You\'re done. Serve with boiled white rice.")',
  },
  {
    RecipeId: 13,
    Name: "Nepali Spiced Tea",
    AuthorId: 1,
    CookTime: 15,
    PrepTime: 5,
    TotalTime: 20,
    DatePublished: "2024-06-18T10:27:23.121Z",
    Description:
      "Chai is easy to make and wonderful to enjoy.  It is often enjoyed after a meal of Curry.  This particular recipe, known as Chiah (pronounced &quot;chee-ah&quot;) is one of many variations served in Southern Asia and some parts of Africa.  This recipe is from one of my favorite books:  Extending the Table and was contributed by Selma Unruh.",
    Images:
      'c("https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/40/80/93/pic48SEOx.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/40/80/93/pic1YArdH.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/40/80/93/picjNNhGV.jpg")',
    RecipeCategory: "< 30 Mins",
    Keywords: "",
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("boiling water", "milk", "sugar", "whole cloves", "cardamom pods", "cinnamon stick")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "75.5",
    FatContent: "1.9",
    SaturatedFatContent: "1.2",
    CholesterolContent: "7.1",
    SodiumContent: "28.9",
    CarbohydrateContent: "13.5",
    FiberContent: "0",
    SugarContent: "11.1",
    ProteinContent: "1.7",
    RecipeInstructions:
      'c("Steep tea in boiling water.", "Add milk, sugar, cloves, cardamom and cinnamon stick.", "Simmer 10 minutes to blend flavors.", "Strain and serve hot.")',
  },
  {
    RecipeId: 14,
    Name: "Nimki (Nepali Crackers)",
    AuthorId: 1,
    CookTime: 5,
    PrepTime: 15,
    TotalTime: 20,
    DatePublished: "2024-06-18T10:27:23.281Z",
    Description:
      "Make and share this Nimki (Nepali Crackers) recipe from Food.com.",
    Images: "character(0)",
    RecipeCategory: "Lunch/Snacks",
    Keywords: 'c("Nepalese", "Asian", "Low Cholesterol", "< 30 Mins", "Easy")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("flour", "salt", "coriander powder", "black sesame seed")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "255.2",
    FatContent: "8.4",
    SaturatedFatContent: "1.1",
    CholesterolContent: "0",
    SodiumContent: "582.8",
    CarbohydrateContent: "38.7",
    FiberContent: "1.6",
    SugarContent: "0.1",
    ProteinContent: "5.6",
    RecipeInstructions:
      'c("Mix all ingredients with 75 gram water to a dough.", "Form about 20 balls and cut these horizontally and vertically with a knife into diamonds.", "Deep fry the nimki a few minutes until golden brown.")',
  },
  {
    RecipeId: 15,
    Name: "Nepali (India) Mango Chutney",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:23.437Z",
    Description:
      "Found in the search for good recipes to use mangos during an abundant crop year.  This is a rich, dark chutney with an exotic flavor.  Others will, likely, not be able to identify the spice combination.  Very nice and different.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/45/27/65/pic5EqOZ9.jpg"',
    RecipeCategory: "Chutneys",
    Keywords:
      'c("Sauces", "Low Protein", "Low Cholesterol", "Healthy", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("mangoes", "brown sugar", "cumin seed", "cardamom", "turmeric", "ginger paste", "clove", "vinegar", "garlic paste", "onion")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "564.3",
    FatContent: "1.6",
    SaturatedFatContent: "0.4",
    CholesterolContent: "0",
    SodiumContent: "32.5",
    CarbohydrateContent: "137.9",
    FiberContent: "6.3",
    SugarContent: "129.8",
    ProteinContent: "3.4",
    RecipeInstructions:
      'c("Peel the mango with knife (good result with potato peeler).", "Evenly sprinkle the sugar over mango and leave for sometime in cool place (for better result leave 12 hours).", "Heat the pan. Roast the cumin, coriander and cardamom. Add everything else and bring to simmer for about.", "2-3 hours on low heat, stirring from time to time, until the mango becomes translucent and the liquid has.", "almost evaporated, leaving behind a thick syrup.", "Remove from heat.", "Let it cool and put into jars using good canning tecnique, using a funnel. Store in cold place an enjoy the mango chutney in coming.", \n"weeks.")',
  },
  {
    RecipeId: 16,
    Name: "Classic Nepali Taas",
    AuthorId: 1,
    CookTime: 45,
    PrepTime: 30,
    TotalTime: 75,
    DatePublished: "2024-06-18T10:27:23.592Z",
    Description:
      "Taas is a popular Nepali meat dish that originated in Chitwan of Southern Nepal. The boneless lamb slices are marinated in Nepali herbs and spices, and slowly cooked in oil in low heat in a large near-flat concave thick-bottomed pan called tawa, resulting in an assertively spiced crispy lamb preparation.  Although lamb or mutton is the preferred meat in a traditional taas preparation, chicken or pork can also be used as a substitute.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/52/69/82/PXfsODEXSh6YdzaqCxB6_Nepali%20Taas.jpg"',
    RecipeCategory: "Nepalese",
    Keywords:
      'c("Asian", "Very Low Carbs", "< 60 Mins", "< 30 Mins", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("boneless lamb", "green onion", "fresh cilantro", "garlic", "ginger", "green chilies", "cumin powder", "coriander powder", "turmeric powder", "black pepper", "red chili powder", "lemon juice", "salt")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "1200.3",
    FatContent: "110.8",
    SaturatedFatContent: "29.5",
    CholesterolContent: "163.3",
    SodiumContent: "735",
    CarbohydrateContent: "11.9",
    FiberContent: "2.4",
    SugarContent: "3.9",
    ProteinContent: "40.7",
    RecipeInstructions:
      'c("In a mixing bowl, combine all the marinating ingredients.  Add lamb slices and mix well.", "Reserve the mixture in a glassware container and refrigerate overnight.", "Remove the marinated lamb mixture from the refrigerator at least 30 minutes prior to cooking, to allow the marinated mixture to cool down to a room temperature.", "Heat the cooking oil in a large thick-bottomed frying pan (tawa) under medium heat.", "Add the marinated lamb mixture to the heated oil.  Gently spread out the mixture about the pan and turn down the heat to low.", \n"Cook the lamb slices in oil by continuously stirring the mixture.  Continue to cook until the lamb slices are fully cooked and have attained caramelization or crispiness (for about 30 minutes).", "When lamb slices are cooked, add the green onions and mix for a minute or two.  Push the cooked lamb slices away from the oil toward the side of the pan to drain the excess oil.", "Place the mixture on a platter and garnish with the chopped cilantro.", "Serve hot with puffed rice or beaten rice, supplemented with fresh cucumber and carrot slices and hot pickled radish achar."\n)',
  },
  {
    RecipeId: 22,
    Name: "Nepalese Momo and Achar",
    AuthorId: 1,
    CookTime: 35,
    PrepTime: 45,
    TotalTime: 80,
    DatePublished: "2024-06-18T10:27:24.637Z",
    Description:
      "Make and share this Nepalese Momo and Achar recipe from Food.com.",
    Images: "character(0)",
    RecipeCategory: "Nepalese",
    Keywords: 'c("Asian", "< 4 Hours", "Easy")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts: 'c("ground chicken", "cabbage", "soy sauce")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "13848.2",
    FatContent: "906.5",
    SaturatedFatContent: "226.2",
    CholesterolContent: "107.5",
    SodiumContent: "14359.3",
    CarbohydrateContent: "1235.6",
    FiberContent: "100.2",
    SugarContent: "6.6",
    ProteinContent: "188.8",
    RecipeInstructions:
      '"mix chicken mince with finely chopped cabbage, onion."',
  },
  {
    RecipeId: 23,
    Name: "Vegetable Momo Filling, (Tse Momo)",
    AuthorId: 1,
    CookTime: 20,
    PrepTime: 20,
    TotalTime: 40,
    DatePublished: "2024-06-18T10:27:24.801Z",
    Description:
      "Vegetable momos are unusual in Tibet. However, this recipe was developed at one of thr Tibetan farming settlements in south India, where meat is an expensive luxury.  Recipe from the Lhasa Moon Tibetan Cookbook.",
    Images: "character(0)",
    RecipeCategory: "Lunch/Snacks",
    Keywords:
      'c("Vegetable", "Nepalese", "Asian", "Savory", "< 60 Mins", "For Large Groups", "Stove Top")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("celery", "cabbage", "spinach", "green onion", "onion", "ginger", "paprika", "pepper", "mint leaves", "soy sauce", "salt")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "22.5",
    FatContent: "0.8",
    SaturatedFatContent: "0.1",
    CholesterolContent: "0",
    SodiumContent: "107.7",
    CarbohydrateContent: "3.4",
    FiberContent: "1.4",
    SugarContent: "1.5",
    ProteinContent: "1.2",
    RecipeInstructions:
      'c("Chop the celery, cabbage, spinach, and green onion finely and by hand; it is important to chop the vegetables by hand: because a food processor will make them mushy and the juices will be lost in cooking.", "Saute the onion in oil until brown and then add the garlic, ginger, paprika, Sichuan pepper, and mint; cook the spices briefly, then remove from the heat and add the soy sauce and salt.", "Add the cooked mixture to the raw chopped vegetables, toss lightly with your hands to mix all together.", \n"Fill the momos and steam for 5-7 minutes.")',
  },
  {
    RecipeId: 17,
    Name: "Nepali Bara",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:23.750Z",
    Description:
      "This is a classic Nepali appetizer consisting of spiced lentil patties cooked in a thick-bottomed pan or tawa.  Any combination of minced meat or vegetables can be added to flavour these delicious lentil patties.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/52/71/73/5M1NG6h3SIKGKlhhKM9f_Nepali%20Bara.jpg"',
    RecipeCategory: "Nepalese",
    Keywords: 'c("Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("black lentils", "lentils", "eggs", "garlic", "ginger", "green chilies", "turmeric", "asafoetida powder")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "650.2",
    FatContent: "38.2",
    SaturatedFatContent: "5.6",
    CholesterolContent: "125.9",
    SodiumContent: "81.1",
    CarbohydrateContent: "44",
    FiberContent: "19.3",
    SugarContent: "3.8",
    ProteinContent: "34.1",
    RecipeInstructions:
      'c("In a large bowl, soak the lentils overnight.  Next day, rinse the soaked lentils thoroughly.  If no outer skin of the lentils is desired, you can rub the soaked lentils between your palms and the outer skin will wash off.", "Transfer the washed lentils to a large blender, add a small amount of water, and blend it into a thick paste.", "Transfer the lentil mixture to a large mixing bowl.  Add the oil, minced garlic, ginger and green chilies.  Add turmeric, asafoetida, and salt and pepper.  Add the beaten eggs and ground meat.  Combine the lentil mixture thoroughly.  At this point, it is better to store the lentil mixture in the refrigerator for a couple of hours to allow for the flavours to fuse.", \n"For cooking, heat 2 tablespoons of cooking oil in a non-stick, thick-bottomed pan or tawa under medium heat. Pour a half cup of the lentil mixture onto the pan and gently spread the mixture into the shape of a mini-pancake.  Repeat with other patties, ensuring to not overcrowd the pan so that you can turn over the patties more easily.", "Cook the patties on one side until the edges have crisped up and the patties themselves have attained a golden brown colour.  Turn the patties over onto the other side and cook until the patties have cooked and are golden brown.  You can use paper towel to remove any excess oil if required.", \n"Transfer to a serving dish and serve hot with mango chutney or any other condiment.", "It is also common to add an egg topping or a minced meat topping or whatever toppings you desire.", "For convenience, an alternative to cooking your baras in a pan is using a waffle machine.  For this, heat up your waffle machine and using oil spray coat the top and bottom surfaces.  Pour a half cup of the lentil mixture on the bottom surface, gently spread out the mixture, and close the lid to cook.  Cook until the lentil patty is cooked and has attained a golden brown colour, approximately 5-7 minutes.  Baking is another healthy way to cook baras."\n)',
  },
  {
    RecipeId: 18,
    Name: "Nepali Cauliflower and Potato Tarkari",
    AuthorId: 1,
    CookTime: 45,
    PrepTime: 30,
    TotalTime: 75,
    DatePublished: "2024-06-18T10:27:23.906Z",
    Description:
      "Make and share this Nepali Cauliflower and Potato Tarkari recipe from Food.com.",
    Images: "character(0)",
    RecipeCategory: "Nepalese",
    Keywords: 'c("Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("cauliflower", "potatoes", "onions", "tomatoes", "fenugreek seeds", "bay leaf", "turmeric", "coriander powder", "cumin powder", "garlic", "ginger", "hot chili powder", "vegetable broth", "salt", "fresh ground black pepper", "cilantro")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "289.1",
    FatContent: "10.5",
    SaturatedFatContent: "1.5",
    CholesterolContent: "0",
    SodiumContent: "868.2",
    CarbohydrateContent: "45.5",
    FiberContent: "10.3",
    SugarContent: "12.4",
    ProteinContent: "8.8",
    RecipeInstructions:
      'c("In a non-stick sauce pan, heat oil and fry fenugreek seeds and bay leaf until dark. Add onion and cook until caramelized.  Add salt and black pepper, turmeric, garlic, ginger, coriander, cumin and chili powder and fry until slightly brown.", "Add potatoes and fry over medium heat for 10 minutes or so until potatoes are lightly browned and cooked half way.", "To the potatoes, add cauliflower and stir-fry for 10-15 minutes, gradually adding broth as required.", "When potatoes and cauliflower are almost done, add diced tomatoes and cook for 5-7 more minutes over low heat until all the liquid is completely absorbed.", \n"Adjust seasoning with salt and pepper. Garnish with chopped cilantro and serve hot with rice or roti (flat bread).")',
  },
  {
    RecipeId: 19,
    Name: "Nepali Style Chicken Curry With Basmati Rice",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 15,
    TotalTime: 45,
    DatePublished: "2024-06-18T10:27:24.091Z",
    Description:
      "Make and share this Nepali Style Chicken Curry With Basmati Rice recipe from Food.com.",
    Images: "character(0)",
    RecipeCategory: "Healthy",
    Keywords: '"< 60 Mins"',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("basmati rice", "onion", "garlic cloves", "fresh ginger", "tomatoes", "boneless skinless chicken thighs", "curry powder", "ground cardamom", "chicken broth", "cilantro")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "566.9",
    FatContent: "16.2",
    SaturatedFatContent: "3.1",
    CholesterolContent: "141.7",
    SodiumContent: "299.1",
    CarbohydrateContent: "62.4",
    FiberContent: "4.8",
    SugarContent: "4.4",
    ProteinContent: "41.5",
    RecipeInstructions:
      'c("Rinse rice until water runs clear.  Bring rice and 2 1/4 cups water to siimmer in large saucepan over medium heat.  Reduce heat to low, cover and simmer until rice is tendar and liquid is absorbed, 16 to 18 minutes.  remove pot from heat and set aside, covered for 10 minutes.", "While rice cooks, chop onion.  Mince garlic.  Peel and grate ginger.  Core tomatoes and chop coarse.", "Trim chicken and cut into 1 inch cubes.  Toss chicken with 2 teaspoons curry powder, salt and pepper in bowl and set aside.", \n"Saute onion in vegetable oil over medium heat until softened.  Add cardamom, garlic, ginger, and remaining 1 teaspoon of curry powder and cook unitl fragrant about 30 seconds.  Stir in chicken and cook until lightly browned, about three minutes.", "Stir in broth and half of tomatoes, scraping up any browned bits, and bring to boil.  Reduce heat to medium low and simmer until chicken is tender and suace is slightly thickened and reduced by half, 8-10 minutes.", "While chicken simmers, chop 2 tablespoons cilantro.  Remove skillet from heat.  In small bowl whisk yogurt until smooth.  Whisk about 1 cup of hot liquid into yogurt until combine,  Stir in cilantro and reamining tomatoes.  Fluff rice with fork and serve."\n)',
  },
  {
    RecipeId: 20,
    Name: "Nepalese Chicken Curry - the Best",
    AuthorId: 1,
    CookTime: 45,
    PrepTime: 45,
    TotalTime: 90,
    DatePublished: "2024-06-18T10:27:24.301Z",
    Description:
      "This is a delightfully different flavour to other countries in Asia and all cooks that love spicy Asian meals will notice the different amounts of the spices that we all use so often, and how its put together make it unique in its own way -  it works and how! its really a lovely recipe and one that I intend to use again - I found it tucked in between one of my many cookbooks - scrawled on a sheet of paper.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/53/59/11/rAitnwblR0y80qLEhn8I_P1110037.jpg"',
    RecipeCategory: "Meat",
    Keywords: 'c("Nepalese", "Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("chicken thighs", "onions", "garlic cloves", "tomatoes", "ginger", "turmeric", "cumin powder", "coriander powder", "chili powder", "cloves", "cinnamon stick", "cardamom pods", "bay leaf", "cumin seed", "salt")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "508.8",
    FatContent: "36.2",
    SaturatedFatContent: "9",
    CholesterolContent: "157.9",
    SodiumContent: "159",
    CarbohydrateContent: "10.9",
    FiberContent: "2.4",
    SugarContent: "4.1",
    ProteinContent: "34.4",
    RecipeInstructions:
      'c("Heat oil in a large saucepan and add the cumin seeds stirring for just 15 seconds or there about. Add onions and fry until they are soft.", "Add the chicken and salt to taste and cook/fry until they become well sealed or slightly brown. add the garlic, ginger, cloves, cardamom,  cinnamon and the bay leaf and stir for a few minutes on medium heat.", "Add Turmeric, chilli, cumin and coriander powders and mix well with the chicken and cook for a further 3-5 minutes stirring.", "Add the tomatoes and stir, lower the heat and simmer with lid just slightly tilted for about 20 minutes - do not be tempted to add water as it will make its own juice."\n)',
  },
  {
    RecipeId: 21,
    Name: "Momos (Tibetan Steamed Dumplings)",
    AuthorId: 1,
    CookTime: 60,
    PrepTime: 20,
    TotalTime: 80,
    DatePublished: "2024-06-18T10:27:24.468Z",
    Description:
      "These are really good. The kid's love having them as a snack. I usually serve with an assortment of fruit as well as dipping sauces such as Sriracha or soy. The kid's like hoisin too. And sometimes Tsal, a mild salsa. Posted for Zaar World Tour 05",
    Images: "character(0)",
    RecipeCategory: "Lunch/Snacks",
    Keywords:
      'c("Meat", "Nepalese", "Chinese", "Asian", "Low Cholesterol", "Healthy", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("all-purpose flour", "water", "onion", "spinach", "cabbage", "garlic clove", "fresh ginger", "green onions", "fresh cilantro", "salt", "diced tomatoes", "cilantro", "green onion", "garlic")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "360.2",
    FatContent: "4.6",
    SaturatedFatContent: "1.8",
    CholesterolContent: "46.8",
    SodiumContent: "91.3",
    CarbohydrateContent: "54.2",
    FiberContent: "3.6",
    SugarContent: "3.8",
    ProteinContent: "23.8",
    RecipeInstructions:
      'c("Mix flour and the water; knead and form into a ball. Sometimes I like to add extra spices to the dough so it\'s not so bland.", "Let rest covered with a wet towel or plastic wrap for 30 minute.", "Combine the filling.", "Bring a large pot of water to the boil.", "Cut dough into 12 - 18 pieces and roll into small flat circles.", "Place a spoonful of filling on each dough circle, folding over and crimping to seal.", "Place momos in a steamer and steam on high for 30 minute.", "To make the Tsal, just combine the ingredients in the amount needed.", \n"I\'ve never measured, just thrown the stuff together, so I have no exact measurements for all of it. For the tomatoes, I always Use Hunts Diced Tomatoes with Sweet Onions. (I\'m lazy :D).")',
  },
  {
    RecipeId: 24,
    Name: "Dal Bhat (Red Lentils With Rice)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 10,
    TotalTime: 40,
    DatePublished: "2024-06-18T10:27:24.970Z",
    Description:
      "This is a traditional Nepali dish.  Red lentils cook quickly and are recommended for this dish.  Delicious topped with chutney or hot pepper of your choice.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/53/31/20/lIiAWYuQKKPdHwrpG29w_IMG_1978.JPG"',
    RecipeCategory: "Indian",
    Keywords: 'c("Low Cholesterol", "Healthy", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("red lentil", "red onion", "garlic cloves", "ginger", "salt", "mustard seeds", "turmeric", "cumin seed", "coriander powder", "tomatoes", "butter", "cilantro", "water", "basmati rice")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "633.2",
    FatContent: "13.8",
    SaturatedFatContent: "3.5",
    CholesterolContent: "7.6",
    SodiumContent: "915",
    CarbohydrateContent: "101.9",
    FiberContent: "14",
    SugarContent: "3.7",
    ProteinContent: "29.3",
    RecipeInstructions:
      'c("Wash the lentils and rinse a couple of times. Be careful to remove any stones. If you have time, soak the lentils in water as long as you can, up to overnight, before you cook. They get very soft and cook faster.", "Start rice preparation according to package directions.", "Prep the onion, garlic, ginger, tomatoes, and cilantro/green onion and set aside.", "Heat oil on high. Add ginger, garlic and onion, and stir fry on high until the onion is a little brown on the edges, 1-2 minutes. Stir in cumin seeds, salt , turmeric, mustard seed and coriander powder. Turn the heat down to medium and cook for 2 minutes, stirring often. Add tomatoes and butter. Stir, cover with lid and cook for 4 minutes. Stir in the lentils, cover and cook for 5 minutes. After cooking for 5 minutes, add one cup of water, cover with lid and cook for 5 more minutes. When the 5 minutes are up, stir in 2 more cups of water, as the water will begin to decrease as you cook. Continue cooking on medium for 10 minutes.  The dal should be cooked and ready to serve.  If not tender, cook a little longer, adding more water if necessary.", \n"Sprinkle the chopped cilantro and/or green onion on top of the dal and serve with or on top of the rice.  It is typical to serve with chutney or spicy peppers.")',
  },
  {
    RecipeId: 25,
    Name: "Samosa",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 60,
    TotalTime: 90,
    DatePublished: "2024-06-18T10:27:25.129Z",
    Description:
      "Carol had asked for this in the forums, hope this helps:) This is a real &quot;must have&quot; in my house on a rainy day or when terribly hungry or even as an appetizer at parties. Please note that the potatoes, onions and green chillies listed in the Dough portion belong in the Filling portion of the recipe. Thanks!",
    Images:
      'c("https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/15/34/8/UlmzdKvSZK9YdR9Kdxwy_DSC08968.JPG", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/15/34/8/picCj2Q7e.jpg", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/15/34/8/Hh8N7rhAQXygPGJdtu9x_DSC08963.JPG", "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/15/34/8/MmxzebEGQF6g2vp9Ct0s_DSC08967.JPG"\n)',
    RecipeCategory: "Asian",
    Keywords:
      'c("Indian", "Low Protein", "Low Cholesterol", "Weeknight", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("all-purpose flour", "potatoes", "onion", "green chilies", "ginger", "garlic", "cilantro", "turmeric", "garam masala", "red chili powder", "salt")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "430.7",
    FatContent: "17.6",
    SaturatedFatContent: "2.3",
    CholesterolContent: "0",
    SodiumContent: "20.3",
    CarbohydrateContent: "61.8",
    FiberContent: "6",
    SugarContent: "4",
    ProteinContent: "7.8",
    RecipeInstructions:
      'c("Mix together the flour, oil and salt.", "Add a little water, until mixture becomes crumbly.", "Keep adding water, kneading the mixture till it becomes a soft pliable dough.", "Cover with a moist cloth and set aside for 20 minutes.", "Beat dough on a work surface and knead again.", "Cover and set aside.", "FILLING.", "Heat 3 tbsp oil.", "Add ginger, garlic, green chillies and few coriander seeds.", "Stir fry for 1 minute, add onions and saute till light brown.", "Add cilantro (fresh coriander), lemon juice, turmeric, red chili, salt and garam masala.", \n"Stir fry for 2 minutes.", "Add potatoes.", "Stir fry for 2 minutes.", "Set aside and allow to cool.", "Divide dough into 10 equal portions.", "Use a rolling pin, roll a piece of dough  into a 5\\" oval.", "Cut into 2 halves.", "Run a moist finger along the diameter.", "Roll around finger to make a cone.", "Place a tablespoon of the filling into the cone.", "Seal the third side using a moist finger.", "Deep fry the samosas on low to medium heat until light brown.", "Serve with tomato sauce or any chutney you love."\n)',
  },
  {
    RecipeId: 26,
    Name: "Gundruk Sadheko (Fermented Vegetables Marinated in Spices)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:25.287Z",
    Description:
      "This is a spicy condiment prepared from fermented hearty vegetables and marinated in Nepali spices. This preparation bears a truly Nepali identity.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/87/97/4/G9xRQgQcRsmvRGCPTvMq_Gundruk%20Achar.jpg"',
    RecipeCategory: "Greens",
    Keywords: 'c("Onions", "Vegetable", "Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("daikon radish", "napa cabbage", "spinach", "red onion", "tomatoes", "garlic", "ginger", "red chile", "cilantro", "lemon juice", "szechwan pepper", "asafoetida powder")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "57.8",
    FatContent: "3.1",
    SaturatedFatContent: "0.4",
    CholesterolContent: "0",
    SodiumContent: "32.4",
    CarbohydrateContent: "6.9",
    FiberContent: "2.5",
    SugarContent: "2.6",
    ProteinContent: "2.1",
    RecipeInstructions:
      'c("Gundruk Preparation: In a large mixing bowl, add all vegetables; rinse and drain.", "Spread out the vegetables evenly on a large tray and allow sun drying for a day, turning frequently, to reduce the moisture.", "The vegetables will have wilted a bit.", "Collect and put in a large bowl.", "Pack the vegetables into a large, thick sterilized jar and compact as much as possible.", "Tighten the lid and let stand for two days in a warm place.", "After the two-day period has elapsed, open the lid and pour out the liquid ponding on top of the vegetable mixture of the jar.", \n"Press down the mixture again and close the lid.", "Allow fermenting for another 3-5 days.", "At the end of the fermentation process, the vegetable will have developed acidic flavors.", "Store in refrigerator.", "Grundruk Marination: In a mixing bowl, combine three cups of freshly fermented gundruk and all the other marinating ingredients.", "Toss well to incorporate all ingredients.", "Cover and refrigerate before serving.", "Serve it as a condiment.")',
  },
  {
    RecipeId: 27,
    Name: "Beans and Bamboo Shoots Tarkari",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:25.451Z",
    Description:
      "This Nepali dish is prepared with soaked black-eyed beans and fermented bamboo shoots curried in spices.",
    Images:
      '"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/87/97/5/FiyZIXLcSg6tjqYZkWtG_Beans%20and%20Bamboo%20Tarkari.jpg"',
    RecipeCategory: "Potato",
    Keywords:
      'c("Black Beans", "Beans", "Vegetable", "Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("bamboo shoot", "potatoes", "black-eyed peas", "onion", "curry powder", "chili powder", "garlic", "ginger", "turmeric", "broth", "water", "chopped tomatoes", "cilantro")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "475.4",
    FatContent: "29.1",
    SaturatedFatContent: "4",
    CholesterolContent: "0.3",
    SodiumContent: "722.2",
    CarbohydrateContent: "48.4",
    FiberContent: "10",
    SugarContent: "10.7",
    ProteinContent: "10.5",
    RecipeInstructions:
      'c("In a frying pan, heat three tablespoons of oil.", "Fry bamboo shoots until light brown; reserve on a plate.", "In a sauce pan heat oil, fry dried red chilies until dark.", "Add onions and sauté until light brown.", "Add curry powder, chili powder, ginger, garlic, whole mustard paste, salt and pepper.", "Fry for one minute over low heat.", "Add potatoes to the onion mixture and sauté for five minutes on medium heat.", "Sprinkle water if it starts to burn.", "Add soaked beans, sautéed bamboo shoots, tomatoes and broth to the potatoes mixture; stir well.", \n"Bring to a boil, and let simmer for 15-20 min.", "over low heat until potatoes are fork-tender, and the gravy has attained its desired consistency.", "Garnish with chopped cilantro.", "Serve with rice or roti (flat bread).")',
  },
  {
    RecipeId: 28,
    Name: "Dudhbari (Sweetened Milk Balls in Pistachio-Flavored Cream Syrup",
    AuthorId: 1,
    CookTime: 60,
    PrepTime: 30,
    TotalTime: 90,
    DatePublished: "2024-06-18T10:27:25.610Z",
    Description:
      "This is a very popular Nepali dessert preparation which consists of sweetened milk balls in pistachio-flavored cream syrup.",
    Images: "character(0)",
    RecipeCategory: "Cheesecake",
    Keywords: 'c("Dessert", "Cheese", "Nepalese", "Asian", "< 4 Hours")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("vinegar", "sugar", "ground cardamom", "butter", "half-and-half cream", "ground cardamom", "rose water", "sugar", "salt", "pistachios")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "913.9",
    FatContent: "51.2",
    SaturatedFatContent: "22.8",
    CholesterolContent: "107.3",
    SodiumContent: "289.4",
    CarbohydrateContent: "94.5",
    FiberContent: "4",
    SugarContent: "84.3",
    ProteinContent: "25.1",
    RecipeInstructions:
      'c("In a large sauce pan, heat milk; bring to a boil.", "Add vinegar and give a gentle swirl.", "The milk solids will have formed.", "Separate solids from liquid by straining through a colander lined with a cheese cloth.", "Allow to drain for a few hours.", "Transfer the milk solids into a mixing bowl and combine with sugar, ground cardamom and melted butter.", "Make 1/2-in balls from the mixture.", "Reserve the milk balls in a non-reactive pan.", "In a sauce pan pour cream; add cardamom, rose water, sugar, salt, pistachio and almond slivers.", \n"Allow to simmer slowly, constantly stirring, until the cream mixture has thickened into a syrupy consistency.", "Remove from heat; allow to cool.", "Pour the syrup mixture into a blender and process into a smooth sauce; coarser if desired.", "Finally, pour the syrup over the milk balls in the pan.", "To serve, put a few cubes in a serving bowl, add some cream sauce, topped with whole pistachio.")',
  },
  {
    RecipeId: 29,
    Name: "Sikarni (Spiced Sweet Yogurt-Pistachio Dessert)",
    AuthorId: 1,
    CookTime: 30,
    PrepTime: 30,
    TotalTime: 60,
    DatePublished: "2024-06-18T10:27:25.769Z",
    Description:
      "This is a rich Nepali dessert made from thickened whole-milk yogurt flavoured with nuts and sweet spices.",
    Images: "character(0)",
    RecipeCategory: "Cheesecake",
    Keywords: 'c("Dessert", "Cheese", "Nepalese", "Asian", "< 60 Mins")',
    RecipeIngredientQualities: null,
    RecipeIngredientParts:
      'c("yogurt", "sour cream", "sugar", "ground cinnamon", "ground black pepper", "ground cardamom", "ground nutmeg", "saffron", "pistachio nut")',
    AggregatedRating: null,
    ReviewCount: null,
    Calories: "866.9",
    FatContent: "44.2",
    SaturatedFatContent: "22.3",
    CholesterolContent: "95",
    SodiumContent: "189",
    CarbohydrateContent: "105.5",
    FiberContent: "2.9",
    SugarContent: "95.7",
    ProteinContent: "18.5",
    RecipeInstructions:
      'c("In a large bowl, mix yogurt and sour cream together.", "Pour the yogurt mixture into a large colander with a cheese cloth liner.", "Allow draining for about 12 hours.", "Transfer the mixture into a mixing bowl.", "Dissolve saffron, if used, in luke warm cream.", "To the yogurt mixture add sugar, cinnamon, black pepper, cardamom, nutmeg, dissolved saffron, and pistachio nuts; fold in thoroughly.", "Chill overnight in refrigerator.", "To serve, scoop a cup of chilled dessert into a serving plate, topped with a generous amount of unsalted, shelled, whole pistachio nuts."\n)',
  },
];

# Recipe Sharing Website - README

## Project Overview

The **Recipe Sharing Website** is a web-based platform where users can explore, share, and discover a wide variety of recipes. Users can add their own recipes, rate recipes shared by others, and bookmark their favorite ones. The website also includes an advanced search functionality, a recommendation system based on user preferences and ingredients, and nutritional value calculations for added recipes.

## Features

1. **User Authentication**: 
   - Users can sign up, log in, and manage their profiles.
   - Ability to view and update profile details, including an "About Me" section.

2. **Recipe Exploration**:
   - Browse a wide range of recipes shared by other users.
   - Filter recipes based on ingredients, categories, difficulty, and preparation time.
   - Sort recipes by popularity, rating, or recent additions.

3. **Recipe Sharing**:
   - Users can add their own recipes with titles, ingredients, steps, and images.
   - Auto-calculation of nutritional values like carbohydrates, fats, proteins, and calories based on the ingredients.

4. **Recipe Rating and Reviews**:
   - Users can rate recipes using a star rating system (1 to 5 stars).
   - Users can leave comments and feedback on recipes.
   - Previously rated recipes are displayed with their ratings for each user.

5. **Bookmarking**:
   - Bookmark favorite recipes to easily access them later.

6. **Recipe Recommendations**:
   - Receive recipe suggestions based on your browsing history, preferences, and ingredients you have on hand.

7. **Advanced Search & Filters**:
   - Real-time search suggestions based on recipe names, ingredients, or categories.
   - Various filter options to narrow down search results (e.g., dietary restrictions, preparation time).

8. **Notification System**:
   - Stay updated with real-time notifications for recipe interactions, such as ratings, comments, or updates.
   - Notifications are stored in local storage and marked as read when clicked.

9. **Nutrition Calculation**:
   - Automatically calculate nutritional values for recipes added by users.
   - Provides information on macronutrients (fats, carbs, proteins) and calories.

## Tech Stack

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - Context API for state management
  - React Router for navigation
  
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for database management
  
- **Other Tools**:
  - Kaggle datasets for initial recipe population
  - Local Storage for notifications
  - Rating and review system

## Installation and Setup

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/sangatsharma/Recipe-recommender.git
   cd Recipe-recommender
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the development server**:
   ```
   npm start
   ```

   

## Usage

1. **Sign Up and Log In**: Create a new account or log in to start exploring recipes.
2. **Browse Recipes**: Use the search and filter options to find recipes.
3. **Add Recipes**: Share your own culinary creations by submitting recipes.
4. **Rate Recipes**: Rate and review recipes you’ve tried.
5. **Bookmark Favorites**: Save your favorite recipes for quick access later.
6. **Explore Recommendations**: Discover new recipes recommended based on your preferences.

## Contribution

We welcome contributions from the community! If you’d like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Enjoy sharing and discovering new recipes with the community!**


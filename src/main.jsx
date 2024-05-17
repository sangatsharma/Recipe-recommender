import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Banner from "./Component/Homepage/Banner/Banner.jsx";
import TrendingFoods from "./Component/Homepage/TrendingFoodSection/TrendingFoods.jsx";
{
  const sampleObject = [
    {
      id: 1,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Spaghetti Carbonara",
      rating: "3.1",
    },
    {
      id: 2,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Miso Ramen",
      rating: "2.6",
    },
    {
      id: 3,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Beef Stroganoff",
      rating: "4.5",
    },
    {
      id: 4,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Shakshuka",
      rating: "2.9",
    },
    {
      id: 5,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Pad Thai",
      rating: "3.6",
    },
    {
      id: 6,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Chicken Alfredo",
      rating: "4.2",
    },
    {
      id: 7,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
      name: "Tom Yum Goong",
      rating: "3.6",
    },
  ];
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Navbar />
      <Banner
        content={
          <TrendingFoods
            items={[
              {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Spaghetti Carbonara",
                rating: "3.1",
              },
              {
                id: 2,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Miso Ramen",
                rating: "2.6",
              },
              {
                id: 3,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Beef Stroganoff",
                rating: "4.5",
              },
              {
                id: 4,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Shakshuka",
                rating: "2.9",
              },
              {
                id: 5,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Pad Thai",
                rating: "3.6",
              },
              {
                id: 6,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Chicken Alfredo",
                rating: "4.2",
              },
              {
                id: 7,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Tom Yum Goong",
                rating: "3.6",
              },
              {
                id: 8,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdzKcJM_bFHrfJa6eEK5gWcsPJYFR3fSFb3YCRlBMvnqN5bmvxVrKcnrTXP9t88NZnDM&usqp=CAU",
                name: "Tom Yum Goong",
                rating: "3.6",
              },
            ]}
          />
        }
      />
    </>
  </React.StrictMode>
);

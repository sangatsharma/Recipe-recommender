import * as React from "react";
import styled from "styled-components"; 

function RecipeCard({ imgSrc, title, description }) { 
  return ( <article className="card"> <img src={imgSrc} alt={title} loading="lazy" className="card-img" /> 
  <div className="card-content"> 
    <h3>{title}</h3> 
    <p>{description}</p> 
  </div> 
  </article> ); 
  } 
  
  function Explore() { 
    const mostPopular = [ 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/953ca54bd46591b16bf01caa283f46320a17b7e9488abbaec157a66131b9c9de?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Baked feta pasta", description: "30 min, 4.9 ⭐️ (22k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/93165e1c52839b9c2933a2ed4d8a29ada82be2465ca6ce4756e7fa28a67b75b7?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Spicy garlic shrimp", description: "20 min, 4.8 ⭐️ (15k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c20dc3da3444dcecab06aaf341de1b63bb8553820152748ccf07268fe517bae?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Creamy Tuscan chicken", description: "35 min, 4.7 ⭐️ (18k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9fcbe0aa08e50b75c6781973937829f36ccc0aef7879f6b67104d8ed00dcfb57?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Mongolian beef", description: "25 min, 4.6 ⭐️ (12k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/96164811ce8c18eb34c3426afdfbef29be9c551a4e394d715baaffa92f268b92?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Lemon garlic butter salmon", description: "15 min, 4.9 ⭐️ (28k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/457f5a18d33becf9c9bf7b03a4eb219bc26849b5d33399e89018d1bf2195d200?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Chicken alfredo bake", description: "40 min, 4.8 ⭐️ (10k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad5050e3cc3d8711cb9c3022de1144d7b4b27aac09425e8cba8d41644c264631?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Garlic parmesan chicken tenders", description: "30 min, 4.7 ⭐️ (14k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8a7ad9f29fdbcf0ecd4c94b6329c6088348c7bfdd7ad986ac424132729f40cfc?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Honey garlic chicken stir fry", description: "25 min, 4.9 ⭐️ (20k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b47006c93e64eb46812beafd1762c04a6263fcf554bc6dc121392be60c17593?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Cajun chicken pasta", description: "35 min, 4.6 ⭐️ (16k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b7a5c519a9feb8af780109095b5e8842d55b08ff7586ef01039068dda3226166?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Teriyaki chicken", description: "20 min, 4.8 ⭐️ (11k+)", }, ]; 
    
    const newArrivals = [ 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d646b2ac3a065b991277b542ed281681594d9803f499997ebc4e1428d6b2858e?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Roasted red pepper hummus", description: "5 min, 4.9 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6827e0d07352a1eb8d2ba9a985aa41866d7e6cf1657c3eb0a6bcea4f27fdce4a?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Tomato basil bruschetta", description: "10 min, 4.8 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbb073f7ecb3f03db95eccd85e5e969ffaa6c502c141e6c660e6bdb7368c4362?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Garlic herb butter", description: "3 min, 4.7 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bc9d094cb94ba07f4add50451e2ba33835303ea2eb323822df3a8a2e1e60811?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Raspberry lemon scones", description: "15 min, 4.9 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a7b859af478d0ce942a29ee0dd6076d15b41617e1e935bd2449d48a4a7ba5e49?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Peanut butter chocolate chip cookies", description: "12 min, 4.8 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7baf34413f2982032a0e3b69b503bc286f7db1894de3a369b11a0983428dd9cf?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Coconut curry butternut squash soup", description: "30 min, 4.7 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f8235ace01d5be193e97bc5bfd4fef48b8977b4f408c38c4af7983dc07d66231?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Avocado mango salad", description: "8 min, 4.9 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a3d4abb20ca38f969ddf60c18329bc3635363ba6faf52ca7736f650ccd129171?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Chili lime grilled corn", description: "20 min, 4.8 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7809c2d0eed72cff598bfc3b6589cd6df3af75cf85bbcea9470eb92872e15642?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Lemon dill salmon burgers", description: "25 min, 4.7 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/cea13a54c3b442bc2e95603a002cade6130208d935372e54354530247cd809f4?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Cilantro lime rice", description: "18 min, 4.8 ⭐️ (1k+)", }, 
    ]; 
    
    const seasonalPicks = [ 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc9a49d25d713cb77d69b47d407b025fd8fb697277084a1898a2625f5975ad9f?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Pumpkin spice latte", description: "5 min, 4.9 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/98489cf71895233800109317306276e768e0f7451c6775cc7a21bd9058de8bb6?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Apple cider donuts", description: "10 min, 4.8 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/0fc165251502d4cc01d5b6cb0c45c7c7fbd7408faee86b6c350e692ec74ed691?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Butternut squash mac and cheese", description: "3 min, 4.7 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4206b1b8c9738dd06ae2e0b85aca71e2f874f32b92992a82581621ec1b456f63?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Cranberry orange bread", description: "15 min, 4.9 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/db96260d87834a3e3f7a6c26e197f43cf933e093fa05b29d074948cb5708ce64?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Sweet potato casserole", description: "12 min, 4.8 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8df346ee74cf80d722733dfacc1c2c7b2ce3189b56ea3d6cd34b9dd03c8d594d?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Pecan pie bars", description: "30 min, 4.7 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b9a9e08530d9206d586511b71a6f64c672cb50fa7aad4eb431667e591f698358?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Maple glazed carrots", description: "8 min, 4.9 ⭐️ (1k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ab939b50a801026dfdd153c6a16ead42661728eb0f1e066fd1b01f3b0ef44289?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Gingerbread cookies", description: "20 min, 4.8 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/efa475831084a36c1b2653abdcfcaebe50f51c0f3379165bf935e39de37e0ba3?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Eggnog french toast", description: "25 min, 4.7 ⭐️ (2k+)", }, 
      { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7f1a5a37ecc90a3b1c0af5e55d902f4cbdb99f2681512839b9473c4a2feeca1?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&", title: "Peppermint hot chocolate", description: "18 min, 4.8 ⭐️ (1k+)", }, 
    ]; 
    
    return ( 
    <div className="container"> 
      <header className="header"> 
      <div className="branding"> 
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/87a06cbd0a55826be47fb966202c64435ab6e5d1824b80964a5aec6575852a8c?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Tasteful logo" className="logo" /> 
        <h1 className="brand-name">Tasteful</h1> 
      </div> 
      <div className="search-container"> 
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5340757afba380c8994fd51852ba9a64e018492828ec6cf32846735be9de8120?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Search icon" className="search-icon" /> 
        <input type="text" placeholder="Search" aria-label="Search" className="search-input" /> 
      </div> 
      <nav className="navigation"> 
        <ul> 
          <li><a href="#home">Home</a></li> 
          <li><a href="#explore">Explore</a></li> 
          <li><a href="#saved">Saved</a></li> 
          <li><a href="#new-recipe">New Recipe</a></li> 
        </ul> 
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8f108c916f703c1e238fde25e3a3bcc98f07b1c4961aca5630f6d2ef67be68e?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="User avatar" className="user-avatar" /> 
      </nav> 
    </header> 
     <main className="main-content"> 
       <section> 
        <h2>Most Popular</h2> 
        <div className="card-list"> 
        {mostPopular.map((recipe, index) => ( 
        <RecipeCard key={index} 
        imgSrc={recipe.imgSrc} 
        title={recipe.title} description={recipe.description} 
        /> ))} 
        </div> 
    </section> 
    <section> 
      <h2>New Arrivals</h2> 
      <div className="card-list"> 
        {newArrivals.map((recipe, index) => ( 
        <RecipeCard key={index} 
        imgSrc={recipe.imgSrc} 
        title={recipe.title} description={recipe.description} 
        /> ))} 
        </div> 
    </section> 
    <section> 
      <h2>Seasonal Picks</h2> 
        <div className="card-list"> 
          {seasonalPicks.map((recipe, index) => ( 
          <RecipeCard key={index} imgSrc={recipe.imgSrc} 
          title={recipe.title} 
          description={recipe.description} 
          /> ))} 
        </div> 
    </section> 
    </main> 
 </div> 
 ); 
} 

const Container = styled.div` 
  background-color: #fff; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  width: 100%; 
  padding: 0 20px; 
  @media (min-width: 992px) { 
    padding: 20px 60px; 
  } 
`; 

const Header = styled.header` 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  width: 100%; 
  padding: 12px 0; 
  border-bottom: 1px solid #e5e8eb; 
`; 

const Branding = styled.div` 
  display: flex; 
  align-items: center; 
`; 
const Logo = styled.img` 
  width: 16px; 
`; 

const BrandName = styled.h1` 
  font-size: 18px; 
  color: #171412; 
  font-weight: 700; 
  margin-left: 16px; 
  @media (max-width: 991px) { 
    white-space: nowrap; 
  } 
`; 

const SearchContainer = styled.div` 
  display: flex; 
  align-items: center; 
  background-color: #f5f2f0; 
  border-radius: 12px; 
  padding: 8px 16px; 
`; 
const SearchIcon = styled.img` 
  width: 24px; 
`; 

const SearchInput = styled.input` 
  border: none; 
  background: none; 
  font-size: 16px; 
  color: #8a7361; 
  margin-left: 12px; 
  outline: none; 
  width: 100%; 
`; 

const Navigation = styled.nav` 
  display: flex; 
  align-items: center; 
  ul { 
    display: flex; 
    gap: 20px; 
    margin: 0; 
    padding: 0; 
    list-style: none; 
    li { 
      a { 
        text-decoration: none; 
        font-size: 14px; 
        color: #171412; 
        font-weight: 500; 
      } 
    } 
  } 
`; 

const UserAvatar = styled.img` 
  width: 40px; 
  margin-left: 20px; 
`; 

const MainContent = styled.main` 
  width: 100%; 
  max-width: 960px; 
`; 

const Section = styled.section` 
  padding: 16px 0; 
  h2 { 
    font-size: 22px; 
    color: #171412; 
    font-weight: 700; 
    margin-bottom: 12px; 
  } 
`; 

const CardList = styled.div` 
  display: flex; 
  gap: 12px; 
  flex-wrap: wrap; 
  @media (min-width: 992px) { 
    flex-wrap: nowrap; 
  } 
`; 

const Card = styled.article` 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  img { 
    width: 100%; 
    max-width: 176px; 
    aspect-ratio: 1; 
    object-fit: cover; 
    margin-bottom: 12px; 
  } 
  h3 { 
    font-size: 16px; 
    font-weight: 500; 
    color: #171412; 
    margin-bottom: 4px; 
  } 
  p { 
    font-size: 14px; 
    color: #8a7361; 
  } 
`; 
export default Explore;
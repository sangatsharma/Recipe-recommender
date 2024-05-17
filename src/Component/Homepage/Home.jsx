import * as React from "react";
import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <Header>
        <LogoWrapper>
          <Logo>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/672e7351807606ec2c4a77b69b2e592a7a677f7f2d17a7e56cc9d8c25c3e9898?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Logo" />
          </Logo>
          <BrandName>Delish</BrandName>
        </LogoWrapper>
        <Nav>
          <button>Home</button>
          <button>Recipes</button>
          <button>Search</button>
          <button>Contact</button>
        </Nav>
        <Actions>
          <ActionBtn>Sign up</ActionBtn>
       {/*// todo: make the button responsive
          // todo: keep the hover effect on the buttons*/}
          <Profile>
            <ProfileIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba7086a20dc031113dc674662b791834c936558beb86e9a5ea0037bb89d13166?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Profile" />
          </Profile>
        </Actions>
      </Header>
      <Main>
        <Banner>
          <BannerImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8633e342d97887dfe297cc4cf30854011ec4a03d96ecae249b416d1ff9154e24?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Banner" />
          <BannerText>
            <Title>Welcome to Cooking Club</Title>
            <Subtitle>A community of cooks, food lovers, and recipe enthusiasts</Subtitle>
          </BannerText>
          <SearchBar>
            <SearchIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e984c6f062b2adac0b24620995056f58eb8356896f17cdb62e542bfbfcdddab4?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Search" />
            <SearchInput type="text" placeholder="Find recipes, ingredients, or dishes" aria-label="Find recipes, ingredients, or dishes" />
            <SearchButton type="button">Search</SearchButton>
          </SearchBar>
        </Banner>
        <SignUpBanner>Sign up now</SignUpBanner>
        <SectionTitle>Popular this week</SectionTitle>
        <RecipesWrapper>
          <RecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ffc044d9c08c898e56f0b2f23aec9a756352d8c37c107300bf9a0144e932772?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Spaghetti Carbonara" />
            <RecipeInfo>
              <RecipeTitle>Spaghetti Carbonara</RecipeTitle>
              <RecipeSaves>3.1k saves</RecipeSaves>
            </RecipeInfo>
          </RecipeCard>
          <RecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/34b7cd86a2ad2e940f5e2398f93cca6b48de957c788ba7707de5139c5014efac?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Miso Ramen" />
            <RecipeInfo>
              <RecipeTitle>Miso Ramen</RecipeTitle>
              <RecipeSaves>2.6k saves</RecipeSaves>
            </RecipeInfo>
          </RecipeCard>
          <RecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d26cf987150033cab724993700b35fd320dc30603bdf8ef89e3e6c8f7678107?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Beef Stroganoff" />
            <RecipeInfo>
              <RecipeTitle>Beef Stroganoff</RecipeTitle>
              <RecipeSaves>5.2k saves</RecipeSaves>
            </RecipeInfo>
          </RecipeCard>
          <RecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d01fd22e506c892516afa17184d29c56e3422150c0724165b53029e61bee96f1?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Shakshuka" />
            <RecipeInfo>
              <RecipeTitle>Shakshuka</RecipeTitle>
              <RecipeSaves>6.8k saves</RecipeSaves>
            </RecipeInfo>
          </RecipeCard>
          <RecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b15a5e6005e95fa70174ce34a6e5b920f73980c111ac2a7c76a99e007383f892?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Pad Thai" />
            <RecipeInfo>
              <RecipeTitle>Pad Thai</RecipeTitle>
              <RecipeSaves>4.3k saves</RecipeSaves>
            </RecipeInfo>
          </RecipeCard>
        </RecipesWrapper>
        <MoreRecipes>
          <MoreRecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e8a5463a0f97171b6f9f3ed678fc739f6636f51a40694f1f445c99491babce3?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Chicken Alfredo" />
            <RecipeInfo>
              <RecipeTitle>Chicken Alfredo</RecipeTitle>
              <RecipeSaves>7.1k saves</RecipeSaves>
            </RecipeInfo>
          </MoreRecipeCard>
          <MoreRecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3a4f4af775a79b1522e40291204df9c740469c64435357e74fd8b1769d79eb4?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Biryani" />
            <RecipeInfo>
              <RecipeTitle>Biryani</RecipeTitle>
              <RecipeSaves>3.9k saves</RecipeSaves>
            </RecipeInfo>
          </MoreRecipeCard>
          <MoreRecipeCard>
            <RecipeImg loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/deeece39bd2d47399455bb288d9e2e9ecbf113e419fff75a4d72ab123f501323?apiKey=b5ff1bf73295468f8aa6c6c634b7791e&" alt="Tom Yum Goong" />
            <RecipeInfo>
              <RecipeTitle>Tom Yum Goong</RecipeTitle>
              <RecipeSaves>5.6k saves</RecipeSaves>
            </RecipeInfo>
          </MoreRecipeCard>
        </MoreRecipes>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background-color: #fcfaf7;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 40px;
  border-bottom: 1px solid rgba(229, 232, 235, 1);
  @media (max-width: 991px) {
    flex-wrap: wrap;
    padding: 0 20px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
`;

const BrandName = styled.span`
  font-size: 18px;
  color: #1c120d;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: -0.27px;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #1c120d;
  font-weight: 500;
  white-space: nowrap;
  line-height: 150%;
  padding: 10px 0;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

const NavItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  font-size: 14px;
  color: #1c120d;
  font-weight: 700;
  background-color: #f2ede8;
  border: none;
  border-radius: 12px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f2ede8;
  border-radius: 12px;
  padding: 10px;
`;

const ProfileIcon = styled.img`
  width: 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 60px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  min-height: 480px;
  padding: 16px 60px 0;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const BannerImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerText = styled.div`
  position: relative;
  color: #fff;
  text-align: center;
  margin-top: 66px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1.58px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  margin-top: 8px;
  padding: 0 71px;
  @media (max-width: 991px) {
    padding: 0 30px 0 20px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0 24px;
  padding: 0 60px;
  background-color: red;
  border-radius: 12px;
  gap: 16px;
  padding: 8px 8px 8px 16px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const SearchIcon = styled.img`
  width: 20px;
`;

const SearchInput = styled.input.attrs({
  type: "text",
})`
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  color: black;
  background: none;
  border: 2px solid red;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  color: #1c120d;
  font-weight: 700;
  background-color: #ed802b;
  border: none;
  border-radius: 12px;
`;

const SignUpBanner = styled.section`
  display: flex;
  font-size: 14px;
  color: #1c120d;
  font-weight: 700;
  background-color: #ed802b;
  border-radius: 12px;
  padding: 10px 16px;
  margin: 12px 0;
  width: 119px;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #1c120d;
  font-weight: 700;
  margin: 16px;
`;

const RecipesWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const RecipeImg = styled.img`
  width: 176px;
  aspect-ratio: 1.79;
`;

const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
`;

const RecipeTitle = styled.h3`
  font-size: 16px;
  color: #1c120d;
  font-weight: 500;
`;

const RecipeSaves = styled.p`
  font-size: 14px;
  color: #996e4d;
  font-weight: 400;
`;

const MoreRecipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 0 16px;
  margin-top: 12px;
  width: 100%;
  max-width: 552px;
`;

const MoreRecipeCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Home;
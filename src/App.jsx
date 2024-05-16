import * as React from "react";

function Nav() {
  
  return (
    <div className="flex flex-col justify-center bg-white">
      
      <div className="flex flex-col items-center pb-5 w-full bg-stone-50 max-md:max-w-full">
        <div className="flex gap-0 justify-between self-stretch px-10 py-3 border-b border-gray-200 border-solid max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 my-auto text-lg font-bold tracking-tight whitespace-nowrap text-stone-900">
            <img
              loading="lazy"
              // todo: replace with real image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/672e7351807606ec2c4a77b69b2e592a7a677f7f2d17a7e56cc9d8c25c3e9898?"
              className="shrink-0 my-auto w-4 aspect-square"
            />
            <div>Delish</div>
          </div>
          <div className="flex gap-5 pl-20 max-md:flex-wrap">
            <div className="flex gap-5 justify-between py-2.5 text-sm font-medium leading-5 whitespace-nowrap text-stone-900">
              <div>Home</div>
              <div>Recipes</div>
              <div>Search</div>
              <div>Contact</div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col justify-center px-4 py-2.5 text-sm font-bold tracking-wide leading-5 rounded-xl bg-stone-200 text-stone-900">
                <div className="justify-center bg-stone-200">Sign up</div>
              </div>
              <div className="flex justify-center items-center p-2.5 w-10 h-10 rounded-xl bg-stone-200">
                <img
                  loading="lazy"
                  // todo add search icon
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba7086a20dc031113dc674662b791834c936558beb86e9a5ea0037bb89d13166?"
                  className="w-5 aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 mt-9 w-full max-w-[960px] max-md:max-w-full">
          <div className="flex overflow-hidden relative flex-col justify-end items-center px-0 pt-0 text-base rounded-xl min-h-[10px] max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              alt="Banner"
              srcSet="src\assets\Images\Banner.png"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="flex relative flex-col justify-center items-center p-10 max-w-full w-[637px]">
              <div className="self-stretch mt-16 text-5xl font-bold tracking-tighter text-center text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                Welcome to Cooking Club
              </div>
              <div className="mt-2 text-center text-white leading-[150%] max-md:max-w-full">
                A community of cooks, food lovers, and recipe enthusiasts
              </div>
              <div className="flex gap-0 py-2 pr-2 pl-4 mt-8 mb-6 rounded-xl bg-stone-50 leading-[150%] max-md:flex-wrap">
                <div className="flex gap-4 my-auto text-stone-500">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e984c6f062b2adac0b24620995056f58eb8356896f17cdb62e542bfbfcdddab4?"
                    className="shrink-0 my-auto w-5 aspect-square"
                  />
                  <p className="text-base font-small  pr-2 text-stone-400 ">Find recipes, ingredients,or dishes</p>
                </div>
                <div className="flex flex-col justify-center px-5 py-3 font-bold tracking-wide whitespace-nowrap bg-orange-500 rounded-xl text-stone-900">
                  <div className="justify-center bg-orange-500">Search</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-4 py-2.5 mt-7 max-w-full text-sm font-bold tracking-wide leading-5 bg-orange-500 rounded-xl text-stone-900 w-[119px]">
            <div className="justify-center bg-orange-500">Sign up now</div>
          </div>
          <div className="mt-7 text-lg font-bold tracking-tight text-stone-900 max-md:max-w-full">
            Popular this week
          </div>
        </div>
        <div className="flex flex-col p-4 mt-2 w-full max-w-[960px] max-md:max-w-full">
          <div className="flex gap-3 leading-[150%] max-md:flex-wrap">
            <div className="flex flex-col flex-1 pb-3">
              <img
                loading="lazy"
                srcSet="src\assets\Images\Recipe1.png"
                className="self-center w-44 aspect-[1.79]"
              />
              <div className="mt-3 text-base font-medium text-stone-900">
                Spaghetti Carbonara
              </div>
              <div className="text-sm text-stone-500">3.1k saves</div>
            </div>
            <div className="flex flex-col flex-1 pb-3">
              <img
                loading="lazy"
                srcSet="src\assets\Images\Recipe1.png"
                className="self-center w-44 aspect-[1.79]"
              />
              <div className="mt-3 text-base font-medium text-stone-900">
                Miso Ramen
              </div>
              <div className="text-sm text-stone-500">2.6k saves</div>
            </div>
            <div className="flex flex-col flex-1 pb-3">
              <img
                loading="lazy"
                srcSet="src\assets\Images\Recipe1.png"
                className="self-center w-44 aspect-[1.79]"
              />
              <div className="mt-3 text-base font-medium text-stone-900">
                Beef Stroganoff
              </div>
              <div className="text-sm text-stone-500">5.2k saves</div>
            </div>
            <div className="flex flex-col flex-1 pb-3">
              <img
                loading="lazy"
                srcSet="src\assets\Images\Recipe1.png"
                className="self-center w-44 aspect-[1.79]"
              />
              <div className="mt-3 text-base font-medium text-stone-900">
                Shakshuka
              </div>
              <div className="text-sm text-stone-500">6.8k saves</div>
            </div>
            <div className="flex flex-col flex-1 pb-3">
              <img
                loading="lazy"
                srcSet="src\assets\Images\Recipe1.png"
                className="self-center w-44 aspect-[1.79]"
              />
              <div className="mt-3 text-base font-medium text-stone-900">
                Pad Thai
              </div>
              <div className="text-sm text-stone-500">4.3k saves</div>
            </div>
          </div>
          <div className="mt-3 max-w-full w-[552px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-3 leading-[150%] max-md:mt-3">
                  <img
                    loading="lazy"
                    srcSet="src\assets\Images\Recipe1.png"
                    className="self-center w-44 aspect-[1.79]"
                  />
                  <div className="mt-3 text-base font-medium text-stone-900">
                    Chicken Alfredo
                  </div>
                  <div className="text-sm text-stone-500">7.1k saves</div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-3 leading-[150%] max-md:mt-3">
                  <img
                    loading="lazy"
                    srcSet="src\assets\Images\Recipe1.png"
                    className="self-center w-44 aspect-[1.79]"
                  />
                  <div className="mt-3 text-base font-medium text-stone-900">
                    Biryani
                  </div>
                  <div className="text-sm text-stone-500">3.9k saves</div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-3 leading-[150%] max-md:mt-3">
                  <img
                    loading="lazy"
                    srcSet="src\assets\Images\Recipe1.png"
                    className="self-center w-44 aspect-[1.79]"
                  />
                  <div className="mt-3 text-base font-medium text-stone-900">
                    Tom Yum Goong
                  </div>
                  <div className="text-sm text-stone-500">5.6k saves</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;

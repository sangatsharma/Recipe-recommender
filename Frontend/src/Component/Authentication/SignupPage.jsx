import React from 'react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4">
        {/* Left Side with Form */}
        <div className="w-1/2 p-10 bg-gray-50">
          <div className="mb-8">
            <img src="path/to/logo.png" alt="Italian Pizza Logo" className="h-12" />
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Irshad Ahamed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Enter Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email Address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                Select your country
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                type="text"
                placeholder="Select your country"
              />
            </div>
            <div className="mb-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                CREATE ACCOUNT
              </button>
            </div>
            <p className="text-gray-600 text-xs">
              By clicking on 'Create Account' you are agreeing to the Terms of Service and the Privacy Policy.
            </p>
            <p className="text-gray-600 text-xs mt-4">Join with</p>
            <div className="flex mt-2 space-x-4">
              <button className="bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                <i className="fab fa-google"></i>
              </button>
              <button className="bg-white hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                <i className="fab fa-twitter"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side with Information */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-700 mb-4">What you will get?</p>
          <ul className="text-gray-700 list-disc list-inside space-y-2">
            <li>Manage your recipes the easy way</li>
            <li>Share recipes with your friends and discover new ones.</li>
            <li>More than 15,000 recipes from around the world!</li>
            <li>Organize recipes by tag, share it with your friends</li>
            <li>Invite your friends to join and start sharing your recipes in a flash.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

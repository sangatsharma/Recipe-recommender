import React, { useEffect, useState } from "react";
import axios from "axios";


const Weather = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json");
        setData(response.data);

        // Fetch weather data only if we have the location data
        const { latitude, longitude } = response.data;
        await fetchWeather(latitude, longitude);
      } catch (err) {
        setError(err);
      } 
    };

    const fetchWeather = async (lat, long) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Call fetchData
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col ">
      <hr />
      <div className="flex-grow">
        <h1>City: {data.city}</h1>
        <br />
        <ul className="text-sm">
          {weatherData && (
            <div>
              <p>
                <strong>Location:</strong> {weatherData.name}
              </p>
              <p>
                <strong>Temperature:</strong> {weatherData.main.temp}°C
              </p>
              <p>
                <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
              </p>
              <p>
                <strong>Weather:</strong> {weatherData.weather[0].main} -
                {weatherData.weather[0].description}
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
              </p>
              <p>
                <strong>Visibility:</strong> {weatherData.visibility} meters
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Weather;

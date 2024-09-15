import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Component/Loader/Loader";

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
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          await fetchWeather(latitude, longitude);
        });
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

  if (loading) return <Loader />;
  if (error) return <p>Turn on your location.</p>;
  return (
    <div className="flex flex-col ">
      <hr />
      <div className="flex-grow">
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

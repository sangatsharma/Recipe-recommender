import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
 const fetchWeatherData = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json");
    // Fetch weather data only if we have the location data
    const { latitude, longitude } = response.data;
    const Data = await fetchWeather(latitude, longitude);
    console.log(Data);
    return Data;
  } catch (err) {
    console.log(err);
  }
};

const fetchWeather = async (lat, long) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCity = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json");
      console.log(response.data.city);
      return response.data.city;
    } catch (err) {
      console.log(err);
    }

  };
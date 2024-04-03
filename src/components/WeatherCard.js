import { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ weather }) => {
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const fetchWeatherIcon = async () => {
      try {
        const response = await axios.get(
          `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          { responseType: "arraybuffer" }
        );
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: "image/png" });
        // Create an object URL from the blob
        const iconUrl = URL.createObjectURL(blob);
        // Set the weather icon URL
        setWeatherIcon(iconUrl);
      } catch (error) {
        console.error("Error fetching weather icon:", error);
      }
    };

    if (weather.weather && weather.weather.length > 0) {
      fetchWeatherIcon();
    }
  }, [weather.weather]);

  return (
    <div className="weather-card">
      <div className="weather-location">
        <h3>{weather.name}</h3>
        <span>...</span>
      </div>

      <div className="weather-info">
        <div className="temp">
          <span className="temp-value">{weather.main.temp} °F</span>
        </div>
        <div className="description">
          <p>{weather.weather[0].description}</p>
          <h5>Min: {weather.main.temp_min}</h5>
          <h5>Max: {weather.main.temp_max}</h5>
        </div>
      </div>

      <div className="image">
        {/* Display the weather icon */}
        {weatherIcon && <img src={weatherIcon} alt="Weather" />}
      </div>

      <div className="extra-details">
        <h4>{weather.main.feels_like} °F Feels Like</h4>
        <h4>{weather.main.humidity}% Humidity</h4>
      </div>
    </div>
  );
};

export default WeatherCard;

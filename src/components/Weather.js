import axios from "axios";
import { useState } from "react";
import WeatherCard from "./WeatherCard";

const Weather = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = () => {
    axios
      .get(`https://open-weather13.p.rapidapi.com/city/${input}`, {
        headers: {
          "X-RapidAPI-Key":
            "4f4078a0e4mshbc9fc21cd5f9555p1c1693jsnaabfbba1cc62",
          "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
        },
      })
      .then((res) => {
        setWeather(res.data);
        setInput("");
      });
  };
  return (
    <div>
      <h1>Weather</h1>
      <div className="search">
        <input
          className="input-field"
          type="text"
          placeholder="Enter City"
          onChange={handleChange}
          value={input}
        />
        <button className="search-btn" onClick={handleSearch}>
          Get Weather
        </button>
      </div>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};
export default Weather;

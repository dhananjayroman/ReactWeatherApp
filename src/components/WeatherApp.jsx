//  "ae27d5d7165852e667e3dac2828b459c"

import React, { useState, useEffect } from "react";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import TimeDisplay from "./TimeDisplay";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState("");

  const apiKey = "ae27d5d7165852e667e3dac2828b459c";
  const city = "Pune";

  // Fetch weather data from API
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();

      if (!data.main || !data.weather) {
        throw new Error("Invalid weather data received.");
      }

      setWeather({
        temp: Math.round(data.main.temp - 273.15),
        tempMin: Math.round(data.main.temp_min - 273.15),
        tempMax: Math.round(data.main.temp_max - 273.15),
        condition: data.weather[0].main.toLowerCase(), // sunny, cloudy, rainy
        location: data.name,
        country: data.sys.country,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to retrieve weather data.");
    }
  };

  // Update time
  const updateTime = () => {
    const date = new Date();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = days[date.getDay()];
    const month = date.toLocaleString("default", { month: "short" });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");

    setDateTime(`${day} | ${month} | ${hours}:${minutes}${period}`);
  };

  useEffect(() => {
    fetchWeatherData();
    updateTime();
    const weatherInterval = setInterval(fetchWeatherData, 600000);
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className={`weather-container ${weather?.condition}`}>
      <h1 className="animated-heading"></h1>
      <div className="box">
        <WeatherInfo weather={weather} />
        <TimeDisplay dateTime={dateTime} />
      </div>
    </div>
  );
};

export default WeatherApp;

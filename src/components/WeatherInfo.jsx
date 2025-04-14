import React from "react";

const WeatherInfo = ({ weather }) => {
  if (!weather) return <p className="error-message">Loading weather...</p>;

  return (
    <div>
      <h2>
        {weather.location}, {weather.country}
      </h2>
      <h1>{weather.temp}°C</h1>
      <p>Min: {weather.tempMin}°C | Max: {weather.tempMax}°C</p>
      <p>Condition: {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}</p>
    </div>
  );
};

export default WeatherInfo;



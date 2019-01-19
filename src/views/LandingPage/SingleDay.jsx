import React from "react";

const SingleDay = props => {
  const week = [
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thurdsday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const {
    day,
    high,
    low,
    summary,
    dewPoint,
    apparentLow,
    apparentHigh,
    humidity,
    windGust,
    windSpeed
  } = props.pickedDay;
  return (
    <div>
      <h2>{`${week.filter(e => e.includes(day))}'s Weather!`}</h2>
      <div style={{ fontSize: "20px" }}>
        <p>High: {high}°F</p>
        <p>Low: {low}°F</p>
        <p>Summary: {summary}</p>
        <p>High Feels Like: {apparentHigh}°F</p>
        <p>Low Feels Like: {apparentLow}°F</p>
        <p>Wind Speed: {windSpeed}Mps</p>
        <p>Wind Gusts: {windGust}Mps</p>
        <p>Dewpoint: {dewPoint}</p>
        <p>Humidity: {humidity}</p>
      </div>
    </div>
  );
};

export default SingleDay;

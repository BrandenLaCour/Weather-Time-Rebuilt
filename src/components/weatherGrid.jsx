import React from "react";
import WeatherCard from "./utils/weatherCard";

const WeatherGrid = props => {
  const { week } = props;
  return (
    <React.Fragment>
      {" "}
      <div>
        {props.label === "Enter City Here" ? "" : <h2>{props.label}</h2>}
      </div>
      <div className="row">
        {/* <WeatherCard className="col" /> */}
        {week.map(e => {
          return (
            <div key={Math.random()} onClick={() => props.dayNav(e.day)}>
              <WeatherCard
                className="col"
                day={e.day}
                high={e.high}
                low={e.low}
                cast={e.cast}
                key={e.day}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default WeatherGrid;

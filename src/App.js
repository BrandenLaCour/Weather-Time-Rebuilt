import React, { Component } from "react";
import WeatherGrid from "./components/weatherGrid";
import { currentWeek } from "./components/utils/currentWeek";
import SingleDay from "./views/LandingPage/SingleDay";
import Change from "./components/utils/change";
import "./App.css";
import Button from "@material-ui/core/Button";
import axios from "axios";

//need to use googles geocode api to convert writen towns into latitude and longitude, so people can write in addresses
// also, map state instead of listing it like below if possible.

// need to refractor a lot of code on this page into components. Mainly the axios calls.

class App extends Component {
  render() {
    const { week, location } = this.props;

    return (
      <div
        id="background"
        className={"container"}
        style={{ marginTop: "100px" }}
      >
        {this.props.nav === "Home" ? (
          <Change
            enter={this.props.handleCityChange}
            loc={this.props.updateTest}
            label={location.name ? location.name : "Enter City Here"}
          />
        ) : this.props.nav === "Weather" && !this.props.day ? (
          <WeatherGrid
            week={week}
            label={location.name}
            dayNav={this.props.handleDayChoice}
          />
        ) : (
          <SingleDay
            pickedDay={
              this.props.day
                ? this.props.week.filter(e => e.day === this.props.day)[0]
                : ""
            }
          />
        )}
        {this.props.nav !== "Home" ? (
          <div className="row justify-center">
            <div className="col-1" />
            <Button
              onClick={this.props.handleReset}
              variant="contained"
              color="primary"
            >
              Restart App
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;

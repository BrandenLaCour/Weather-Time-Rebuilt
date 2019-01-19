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
  state = {
    week: [
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      },
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      },
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      },
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      },
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      },
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      },
      {
        day: "",
        high: "",
        low: "",
        cast: "",
        summary: "",
        dewPoint: "",
        humidity: "",
        windSpeed: "",
        windGust: "",
        apparentHigh: "",
        apparentLow: ""
      }
    ],
    location: { name: "", latLng: "41.8781,-87.6298" },
    nav: "Home",
    day: ""
  };
  // refractor code to shorten this page, export to other components
  componentWillMount() {
    //creating the proper week layout depending on the day the app is rendered
    const newDate = new Date();
    const day = newDate.getDay();
    let oldWeek = [...this.state.week];
    const newWeek = currentWeek(day);
    const week = oldWeek.map((e, i) => {
      e.day = newWeek[i];
      e.high = "";
      e.low = "";
      e.cast = "partly-cloudy-day";
      return e;
    });

    this.setState({ week });
  }

  // get the default weather (chicago) from the api
  async componentDidMount() {
    const latLng = this.state.location.latLng;
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bab642085489d446f31df424bdf3e506/${latLng}`
    );
    console.log(data);
    const { data: allDays } = data.daily;

    let week = [...this.state.week];
    //refractor to shorten code here
    const days = [
      allDays[0],
      allDays[1],
      allDays[2],
      allDays[3],
      allDays[4],
      allDays[5],
      allDays[6]
    ];

    const fiveDay = week.map((e, i) => {
      e.high = Math.round(days[i].temperatureHigh);
      e.low = Math.round(days[i].temperatureLow);
      e.cast = days[i].icon;
      e.day = week[i].day;
      e.summary = days[i].summary;
      e.windGust = days[i].windGust;
      e.windSpeed = days[i].windSpeed;
      e.apparentHigh = days[i].apparentTemperatureHigh;
      e.apparentLow = days[i].apparentTemperatureLow;
      e.dewPoint = days[i].dewPoint;
      e.humidity = days[i].humidity;
      return e;
    });

    week = fiveDay;

    this.setState({ week });
  }

  handleCityChange = async e => {
    if (e.keyCode === 13) {
      const { data } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${
          e.target.value
        }&key=7ca85273b7674386bb62871692d50432`
      );
      try {
        const geo = data.results[0].geometry;
        const city = data.results[0].components.city;
        const state = data.results[0].components.state;

        let location = { ...this.state.location };
        city ? (location.name = `${city}, ${state}`) : (location.name = state);
        location.latLng = `${geo.lat},${geo.lng}`;
        this.setState({ location });
      } catch (err) {
        console.log(err, "wrong input, or you did not add anything");
      }
      console.log(
        `hoorah! Your weather is set to ${
          this.state.location.name
        } at coordinates ${this.state.location.latLng}`
      );
      this.updateTest();
    }
  };
  // switch the location to the designated area
  updateTest = async () => {
    console.log("ran");
    const name = this.state.location.name;
    const latLng = this.state.location.latLng;
    const { data } = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/bab642085489d446f31df424bdf3e506/${latLng}`
    );

    const { data: allDays } = data.daily;

    let week = [...this.state.week];
    //refractor to shorten code here
    const days = [
      allDays[0],
      allDays[1],
      allDays[2],
      allDays[3],
      allDays[4],
      allDays[5],
      allDays[6]
    ];

    const fiveDay = week.map((e, i) => {
      e.high = Math.round(days[i].temperatureHigh);
      e.low = Math.round(days[i].temperatureLow);
      e.cast = days[i].icon;
      e.day = week[i].day;
      e.summary = days[i].summary;
      return e;
    });

    week = fiveDay;
    let location = { ...this.state.location };
    location.name = name;
    const nav = "Weather";
    this.setState({ week, location, nav });
  };

  handleDayChoice = day => {
    this.setState({ day: day });
  };

  handleHome = nav => {
    this.setState({ nav });
  };

  handleReset = () => {
    const day = "";
    const nav = "Home";
    this.setState({ day, nav });
  };

  render() {
    const { week, location } = this.state;

    return (
      <div
        id="background"
        className={"container"}
        style={{ marginTop: "100px" }}
      >
        {this.state.nav === "Home" ? (
          <Change
            enter={this.handleCityChange}
            loc={this.updateTest}
            label={location.name ? location.name : "Enter City Here"}
          />
        ) : this.state.nav === "Weather" && !this.state.day ? (
          <WeatherGrid
            week={week}
            label={location.name}
            dayNav={this.handleDayChoice}
          />
        ) : (
          <SingleDay
            pickedDay={
              this.state.day
                ? this.state.week.filter(e => e.day === this.state.day)[0]
                : ""
            }
          />
        )}
        {this.state.nav !== "Home" ? (
          <div className="row justify-center">
            <div className="col-1" />
            <Button
              onClick={this.handleReset}
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

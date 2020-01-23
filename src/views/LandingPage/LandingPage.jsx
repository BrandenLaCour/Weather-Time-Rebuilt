import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { currentWeek } from "../../components/utils/currentWeek";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import axios from "axios";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import App from "../../App";

const dashboardRoutes = [];

class LandingPage extends React.Component {
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
    const { data } = await axios.post(
      `https://polar-tor-79067.herokuapp.com/`, {latLong: latLng}
    );
    console.log('ran request')

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
      const { data } = await axios.post(
      `https://polar-tor-79067.herokuapp.com/`, {city: e.target.value}
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
    const name = this.state.location.name;
    const latLng = this.state.location.latLng;
    const { data } = await axios.post(
      `https://polar-tor-79067.herokuapp.com/`, {latLong: latLng}
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

  handleReset = () => {
    const day = "";
    const nav = "Home";
    this.setState({ day, nav });
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Material Kit React"
          rightLinks={<HeaderLinks handleReset={this.handleReset} />}
          fixed
          handleReset={this.handleReset}
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax medium filter image={require("assets/img/weather.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Weather Time</h1>
                <h4>Casting The Weather from Zeus</h4>
                <br />
                {this.state.nav !== "Home" ? (
                  <h5>Click a day for more information!</h5>
                ) : null}
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <App
              nav={this.state.nav}
              day={this.state.day}
              week={this.state.week}
              location={this.state.location}
              handleReset={this.handleReset}
              updateTest={this.updateTest}
              handleDayChoice={this.handleDayChoice}
              handleCityChange={this.handleCityChange}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);

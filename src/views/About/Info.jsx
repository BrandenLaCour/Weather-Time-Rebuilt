import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import snackbarContentStyle from "./../../assets/jss/material-kit-react/components/snackbarContentStyle";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>About The App</h2>
            <h5 className={classes.description}>
              <p>
                This app was originally created to get a better understanding of
                react. I wanted to challenge myself to create a fully
                functioning app, while at the same time continue to learn and
                rebuild it as my knowledge increased.
              </p>
              <p>
                In the beggining, the app had pre-defined cities that you could
                choose from, because dark sky requires lattitude and longitude
                coordinates. After a bit of digging, I found a forward geocoding
                api that was able to convert city and town names, into lattitude
                and longitude coordinates. Hooray!
              </p>
              <p>
                The main bulk of the app is redefining state depending on the
                city chosen. When state initializes, it has an empty week, once
                the city is chosen, Dark sky gives me a weeks worth of data. I
                use the current date and a for loop to figure out what the first
                day of the week should be, then I map through the Api response,
                and set the state with that weather data. Finally, another map
                function is run on a card component to reduce repetition and
                give me a full week layout of clickable icons.
              </p>
              <p>
                I plan to continue developoment on this little project until it
                has redux fully implemented as well!
              </p>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer />
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);

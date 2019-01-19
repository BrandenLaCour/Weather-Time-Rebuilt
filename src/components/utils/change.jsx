import React from "react";

import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class Change extends React.Component {
  state = {
    name: ""
  };

  resetValue = e => {
    if (e.keyCode === 13) {
      e.target.value = "";
      this.setState({ name: "" });
      setTimeout(() => {
        this.setState({ name: this.props.label });
      }, 1000);
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-name"
            label={this.props.label}
            className={classes.textField}
            onChange={this.handleChange("name")}
            onKeyDown={this.props.enter}
            onKeyUp={this.resetValue}
            value={this.state.name}
            margin="normal"
            variant="outlined"
          />
          {/* <FormHelperText>placeholder</FormHelperText> */}
        </FormControl>
      </div>
    );
  }
}

Change.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Change);

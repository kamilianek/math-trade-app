import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import actions from '../../actions';

const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
});


class RegistrationView extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      isFirstNameValid: true,
      lastName: '',
      isLastNameValid: true,
      username: '',
      isUsernameValid: true,
      email: '',
      isEmailValid: true,
      password: '',
      repeatedPassword: '',
      isPasswordValid: true,
      address: '',
      isAddressValid: true,
      city: '',
      isCityValid: true,
      zip: '',
      isZipValid: true,
      country: '',
      isCountryValid: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleErrorClose = name => (this.state[name] ? null : { [name]: true });

  validateForm = () => {
    const { alert } = this.props;

    const isFirstNameValid = this.state.firstName.length >= 2 && this.state.firstName.length < 41;
    const isLastNameValid = this.state.lastName.length >= 2 && this.state.lastName.length < 41;
    const isUsernameValid = this.state.username.length >= 3 && this.state.username.length < 15;
    const isEmailValid = this.state.email.length > 0 && this.state.email.length < 41;
    const isPasswordValid = this.state.password.length >= 6
      && this.state.repeatedPassword.length >= 6;
    const isPasswordValidSame = !(this.state.password === this.state.repeatedPassword);
    const isAddressValid = this.state.address.length > 0;
    const isCityValid = this.state.city.length > 0;
    const isZipValid = this.state.zip.length > 0;
    const isCountryValid = this.state.country.length > 0;

    console.log({
      isFirstNameValid,
      isLastNameValid,
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isAddressValid,
      isCityValid,
      isZipValid,
      isCountryValid,
    });

    if (isPasswordValidSame) {
      alert.show('Completed passwords are different', { type: 'error' });
    }

    return isFirstNameValid && isLastNameValid && isUsernameValid && isEmailValid && isPasswordValid
      && isPasswordValidSame && isAddressValid && isCityValid && isZipValid && isCountryValid;
  };

  onRegisterSubmit = () => {
    const { registerWithPassword, alert } = this.props;

    if (this.validateForm()) {
      const data = {
        name: this.state.firstName,
        surname: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        address: this.state.address,
        city: this.state.city,
        postalCode: this.state.zip,
        country: this.state.country,
      };

      registerWithPassword(data)
        .then(() => alert.show('Successfully created account', { type: 'success' }))
        .catch(error => alert.show(error.message, { type: 'error' }));
    }
  };

  render() {
    const { classes, isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to='/' />;
    }

    return (
      <div className={classes.mainContainer}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon>spellcheck</Icon>
          </Avatar>
          <Typography variant="h6" gutterBottom>
            Register
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
                error={!this.state.isFirstNameValid}
                onChange={(event) => {
                  this.handleChange(event, 'firstName');
                  this.setState(this.handleErrorClose('isFirstNameValid'));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
                error={!this.state.isLastNameValid}
                onChange={(event) => {
                  this.handleChange(event, 'lastName');
                  this.setState(this.handleErrorClose('isLastNameValid'));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                autoComplete="uname"
                error={!this.state.isUsernameValid}
                onChange={(event) => {
                  this.handleChange(event, 'username');
                  this.setState(this.handleErrorClose('isUsernameValid'));
                }}
                helperText="3-15 characters"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email address"
                fullWidth
                autoComplete="email"
                error={!this.state.isEmailValid}
                onChange={(event) => {
                  this.handleChange(event, 'email');
                  this.setState(this.handleErrorClose('isEmailValid'));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password1"
                name="password1"
                label="Password"
                type="password"
                fullWidth
                autoComplete="pass1"
                error={!this.state.isPasswordValid}
                onChange={(event) => {
                  this.handleChange(event, 'password');
                  this.setState(this.handleErrorClose('isPasswordValid'));
                }}
                helperText="Minimum 6 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password2"
                name="password2"
                label="Confirm password"
                type="password"
                fullWidth
                autoComplete="pass2"
                error={!this.state.isPasswordValid}
                onChange={(event) => {
                  this.handleChange(event, 'repeatedPassword');
                  this.setState(this.handleErrorClose('isPasswordValid'));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address line"
                required
                fullWidth
                autoComplete="address"
                error={!this.state.isAddressValid}
                onChange={(event) => {
                  this.handleChange(event, 'address');
                  this.setState(this.handleErrorClose('isAddressValid'));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="city"
                error={!this.state.isCityValid}
                onChange={(event) => {
                  this.handleChange(event, 'city');
                  this.setState(this.handleErrorClose('isCityValid'));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                onChange={event => this.handleChange(event, 'region')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="postal-code"
                error={!this.state.isZipValid}
                onChange={(event) => {
                  this.handleChange(event, 'zip');
                  this.setState(this.handleErrorClose('isZipValid'));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="country"
                error={!this.state.isCountryValid}
                onChange={(event) => {
                  this.handleChange(event, 'country');
                  this.setState(this.handleErrorClose('isCountryValid'));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.onRegisterSubmit}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

RegistrationView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  registerWithPassword: data => dispatch(actions.auth.registerWithPassword(data)),
});

const mapStateToProps = state => ({
  con: console.log(state),
  isLoggedIn: !!(state.auth && state.auth.token),
});


export default withAlert(
  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegistrationView)),
);

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
  render() {
    const { classes } = this.props;
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password1"
                name="password1"
                label="Password"
                fullWidth
                autoComplete="pass1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password2"
                name="password2"
                label="Confirm password"
                fullWidth
                autoComplete="pass2"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="addiress"
                name="addiress"
                label="Address line"
                fullWidth
                autoComplete="address"
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="postal-code"
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => console.log('Register')}
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


export default withStyles(styles)(RegistrationView);

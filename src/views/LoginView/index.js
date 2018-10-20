import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';


const facebookLoginButton = require('./facebook_logo.png');

const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submitButton: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  otherLoginOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20px',
  },
  facebookLoginButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  registerButton: {
    textAlign: 'center',
  },
});


class LoginView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon>lock</Icon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username/Email</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={() => console.log('Login with password')}
          >
            Sign in
          </Button>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Button
                type="submit"
                onClick={() => console.log('login with facebook')}
              >
                <Typography component="p">
                  Login with
                </Typography>
                <img
                  alt="LoginWithFacebook"
                  src={facebookLoginButton}
                  className={classes.facebookLoginButton}
                />

              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                color="primary"
                className={classes.registerButton}
                onClick={() => console.log('login with facebook')}
              >
                Register
                <div
                  className={classes.facebookLoginButton}
                />

              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginView);

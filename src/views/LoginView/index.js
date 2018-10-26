import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

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

import actions from '../../actions';
import AlertMessage from '../../components/AlertMessage';

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
  constructor() {
    super();

    this.state = {
      username: '',
      isUsernameValid: true,
      password: '',
      isPasswordValid: true,
      navigateToRegisterView: false,
    };

    this.passwordLogin = this.passwordLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
  }

  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleErrorClose = name => (this.state[name] ? null : { [name]: true });

  passwordLogin() {
    const { loginWithPassword } = this.props;
    const { username, password } = this.state;

    if (!this.validateForm()) {
      console.log('invalid form');
      return;
    }

    console.log('login with: ', username, ', ', password);

    loginWithPassword(username, password)
      .then(() => {
        console.log('successful login with password');
        AlertMessage()
      })
      .catch(() => console.log('error while login'));
  }

  validateForm() {
    const isUsernameValid = this.state.username.length > 0;
    const isPasswordValid = this.state.password.length > 0;

    this.setState({
      isUsernameValid,
      isPasswordValid,
    });

    return isUsernameValid && isPasswordValid;
  }

  render() {
    const {
      classes,
      isLoggedIn,
    } = this.props;

    const {
      password,
      username,
      isUsernameValid,
      isPasswordValid,
      navigateToRegisterView,
    } = this.state;

    if (isLoggedIn) {
      return <Redirect to='/' />;
    }

    if (navigateToRegisterView) {
      return <Redirect to='/register' />;
    }

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
            <FormControl
              margin="normal"
              required
              fullWidth
              error={!isUsernameValid}
            >
              <InputLabel htmlFor="email">Username/Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                required
                value={username}
                onChange={(event) => {
                  this.handleChange(event, 'username');
                  this.setState(() => this.handleErrorClose('isUsernameValid'));
                }}
              />
            </FormControl>
            <FormControl
              margin="normal"
              required
              fullWidth
              error={!isPasswordValid}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={password}
                required
                autoComplete="current-password"
                onChange={(event) => {
                  this.handleChange(event, 'password');
                  this.setState(() => this.handleErrorClose('isPasswordValid'));
                }}
              />
            </FormControl>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={this.passwordLogin}
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
                onClick={() => this.setState({ navigateToRegisterView: true })}
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

const mapStateToProps = state => ({
  isLoggedIn: !!(state.auth && state.auth.token),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginWithPassword: actions.auth.loginWithPassword,
}, dispatch);


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginView));

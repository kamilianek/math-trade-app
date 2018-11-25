import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withAlert } from 'react-alert';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import MainContainer from '../../components/MainContainer';
import CustomDialog from '../../components/CustomDialog';

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
  optionButton: {
    marginRight: theme.spacing.unit,
  },
  form: {
    marginTop: theme.spacing.unit * 3,
  },
  passwordField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
});


class AccountView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isNameValid: true,
      surname: '',
      isSurnameValid: true,
      email: '',
      isEmailValid: true,
      address: '',
      isAddressValid: true,
      city: '',
      isCityValid: true,
      postalCode: '',
      isPostalCodeValid: true,
      country: '',
      isCountryValid: true,
      editMode: false,
      newPassword: '',
      repeatedPassword: '',
      isNewPasswordValid: true,
      passwordChangeMode: false,
    };

    this.nameInput = React.createRef();

    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleUpdateCancel = this.handleUpdateCancel.bind(this);
    this.handleOnEditMode = this.handleOnEditMode.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.passwordDialogAgree = this.passwordDialogAgree.bind(this);
    this.passwordDialogDisagree = this.passwordDialogDisagree.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    const {
      alert,
      fetchUserDetailsIfNeeded,
    } = this.props;

    fetchUserDetailsIfNeeded()
      .catch(() => alert.show('Cannot load your details', { type: 'error' }));
  }


  handleChange = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validateForm = () => {
    const isNameValid = this.state.name.length > 0;
    const isSurnameValid = this.state.surname.length > 0;
    const isEmailValid = this.state.email.length > 0;
    const isAddressValid = this.state.address.length > 0;
    const isCityValid = this.state.city.length > 0;
    const isPostalCodeValid = this.state.postalCode.length > 0;
    const isCountryValid = this.state.country.length > 0;

    this.setState({
      isNameValid,
      isSurnameValid,
      isEmailValid,
      isAddressValid,
      isCityValid,
      isPostalCodeValid,
      isCountryValid,
    });

    return isNameValid && isSurnameValid && isEmailValid
      && isAddressValid && isCityValid && isPostalCodeValid && isCountryValid;
  };

  handleErrorClose = name => (this.state[name] ? null : { [name]: true });

  handleUpdateSubmit() {
    const {
      updateUserDetails,
      alert,
    } = this.props;

    const {
      name,
      surname,
      email,
      address,
      city,
      postalCode,
      country,
    } = this.state;

    if (this.validateForm()) {
      updateUserDetails(name, surname, email, address, city, postalCode, country)
        .then(() => alert.show('Successfully updated user details', { type: 'success' }))
        .catch(error => alert.show(error.message, { type: 'error' }));
    }
  }

  handleUpdateCancel() {
    this.setState({
      editMode: false,
      isNameValid: true,
      isSurnameValid: true,
      isEmailValid: true,
      isAddressValid: true,
      isCityValid: true,
      isPostalCodeValid: true,
      isCountryValid: true,
    });
  }

  handleOnEditMode() {
    const { data } = this.props;
    this.setState({
      editMode: true,
      name: data.name,
      surname: data.surname,
      email: data.email,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
    });
  }

  handlePasswordChange() {
    this.setState({
      passwordChangeMode: true,
    });
  }

  renderAcionButtons() {
  }

  passwordDialogDisagree() {
    this.setState({
      newPassword: '',
      repeatedPassword: '',
      isNewPasswordValid: true,
      passwordChangeMode: false,
    });
  }

  passwordDialogAgree() {
    const {
      changePassword,
      alert,
    } = this.props;

    const {
      newPassword,
      repeatedPassword,
    } = this.state;

    if (newPassword !== repeatedPassword) {
      this.setState({ isNewPasswordValid: false });
      alert.show('Passwords are different', { type: 'error' });
      return;
    }

    if (newPassword.length < 7) {
      this.setState({ isNewPasswordValid: false });
      alert.show('Passwords is too short', { type: 'error' });
      return;
    }

    if (newPassword.length > 19) {
      this.setState({ isNewPasswordValid: false });
      alert.show('Passwords is too long', { type: 'error' });
    }

    changePassword(newPassword)
      .then((response) => {
        this.passwordDialogDisagree();
        alert.show(response, { type: 'success' });
      })
      .catch(error => alert.show(error.message, { type: 'error' }));
  }


  renderPasswordDialog() {
    const {
      passwordChangeMode,
      newPassword,
      repeatedPassword,
      isNewPasswordValid,
    } = this.state;

    const { classes } = this.props;

    return (
      <CustomDialog
        handleDisagree={this.passwordDialogDisagree}
        handleAgree={this.passwordDialogAgree}
        title="Change password"
        textBody=""
        openDialog={passwordChangeMode}
        agreeText="save"
        disagreeText="cancel"
      >
        <TextField
          error={!isNewPasswordValid}
          value={newPassword}
          type="password"
          id="password"
          label="New password"
          helperText="Password should contain 7-19 characters"
          className={classes.passwordField}
          margin="normal"
          onChange={(event) => {
            this.handleChange(event, 'newPassword');
            this.setState(this.handleErrorClose('isNewPasswordValid'));
          }}
        />
        <TextField
          error={!isNewPasswordValid}
          value={repeatedPassword}
          type="password"
          id="repeatedPassword"
          label="New password"
          className={classes.passwordField}
          margin="normal"
          onChange={(event) => {
            this.handleChange(event, 'repeatedPassword');
            this.setState(this.handleErrorClose('isNewPasswordValid'));
          }}
        />
      </CustomDialog>
    );
  }

  render() {
    const { classes, data } = this.props;
    const { editMode } = this.state;

    return (
      <>
        <MainContainer />
        <div className={classes.mainContainer}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Icon>perm_identity</Icon>
            </Avatar>
            <Typography variant="h6" gutterBottom>
              { data.username }
            </Typography>
            <Grid container spacing={24} className={classes.form}>
              <Grid item xs={12} sm={6}>
                <TextField
                  ref={this.nameInput}
                  required
                  id="firstName"
                  label="First name"
                  fullWidth
                  value={editMode ? this.state.name : data.name}
                  autoComplete="fname"
                  disabled={!editMode}
                  error={!this.state.isNameValid}
                  onChange={(event) => {
                    this.handleChange(event, 'name');
                    this.setState(this.handleErrorClose('isNameValid'));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  label="Last name"
                  fullWidth
                  value={editMode ? this.state.surname : data.surname}
                  autoComplete="lname"
                  error={!this.state.isSurnameValid}
                  disabled={!editMode}
                  onChange={(event) => {
                    this.handleChange(event, 'surname');
                    this.setState(this.handleErrorClose('isSurnameValid'));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Email address"
                  fullWidth
                  autoComplete="email"
                  defaultValue={editMode ? this.state.email : data.email}
                  error={!this.state.isEmailValid}
                  disabled={!editMode}
                  onChange={(event) => {
                    this.handleChange(event, 'email');
                    this.setState(this.handleErrorClose('isEmailValid'));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  label="Address line"
                  required
                  fullWidth
                  autoComplete="address"
                  value={editMode ? this.state.address : data.address}
                  error={!this.state.isAddressValid}
                  disabled={!editMode}
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
                  label="City"
                  fullWidth
                  autoComplete="city"
                  value={editMode ? this.state.city : data.city}
                  error={!this.state.isCityValid}
                  disabled={!editMode}
                  onChange={(event) => {
                    this.handleChange(event, 'city');
                    this.setState(this.handleErrorClose('isCityValid'));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="postalCode"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="postal-code"
                  value={editMode ? this.state.postalCode : data.postalCode}
                  error={!this.state.isPostalCodeValid}
                  disabled={!editMode}
                  onChange={(event) => {
                    this.handleChange(event, 'postalCode');
                    this.setState(this.handleErrorClose('isPostalCodeValid'));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                  defaultValue={editMode ? this.state.country : data.country}
                  error={!this.state.isCountryValid}
                  disabled={!editMode}
                  onChange={(event) => {
                    this.handleChange(event, 'country');
                    this.setState(this.handleErrorClose('isCountryValid'));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {
                  editMode ? <>
                    <Button
                      className={classes.optionButton}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.handleUpdateSubmit}
                    >
                      Save
                    </Button>
                    <Button
                      className={classes.optionButton}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.handleUpdateCancel}
                    >
                      Cancel
                    </Button>
                  </> : <>
                    <Button
                      className={classes.optionButton}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.handleOnEditMode}
                    >
                      Edit details
                    </Button>
                    <Button
                      className={classes.optionButton}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.handlePasswordChange}
                    >
                      Change password
                    </Button>
                  </>
                }
              </Grid>
            </Grid>
          </Paper>
        </div>
        {this.renderPasswordDialog()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: {
    ...state.user.data,
  },
  consolelog: console.log('>> state: ', state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserDetails: (name, surname, email, address, city, postalCode, country) => (
    actions.user.updateUserDetails(name, surname, email, address, city, postalCode, country)
  ),
  fetchUserDetailsIfNeeded: () => (
    actions.user.fetchUserDetailsIfNeeded()
  ),
  changePassword: newPassword => (
    actions.auth.changePassword(newPassword)
  ),
}, dispatch);

export default withStyles(styles)(
  withAlert(connect(mapStateToProps, mapDispatchToProps)(AccountView)),
);

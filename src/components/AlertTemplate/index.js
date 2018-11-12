/**
 * Created by kamilianek on 01.11.18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  mainContainer: {
    padding: theme.spacing.unit * 3,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

class AlertTemplate extends Component {
  render() {
    const {
      classes,
      message,
      options,
      close,
    } = this.props;
    const variant = options.type;
    console.log('propsy: ', this.props);
    return (
      <SnackbarContent
        className={classNames(classes[variant], classes.mainContainer)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}>
            {variantIcon[variant]}
          </Icon>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={close}
          >
            <Icon className={classes.icon}>close</Icon>
          </IconButton>,
        ]}
      />
    );
  }
}

AlertTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};


export default withStyles(styles)(AlertTemplate);

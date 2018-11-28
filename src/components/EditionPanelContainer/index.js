/**
 * Created by kamilianek on 06.11.18.
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import actions from '../../actions';

const styles = theme => ({
  mainContainer: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  rightButtonIcon: {
    marginRight: theme.spacing.unit,
  },
  addEditionButtonContainer: {
    width: '100%',
    height: theme.spacing.unit * 8,
    position: 'relative',
    marginBottom: theme.spacing.unit * 6,
  },
  backButton: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 10,
  },
  joinButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  editionNavigationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 5,
  },
  editionNavigation: {
    width: 500,
    marginBottom: theme.spacing.unit * 10,
  },
  title: {
    marginBottom: theme.spacing.unit * 3,
  },
});

const navigationValues = {
  products: 0,
  preferences: 1,
  definedGroups: 2,
};

class EditionPanelContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationValue: 0,
      goBack: false,
    };

    this.handleJoiningEdition = this.handleJoiningEdition.bind(this);
  }

  handleJoiningEdition() {
    const { joinEdition, alert } = this.props;

    joinEdition()
      .then(() => alert.show('Successfully joined edition', { type: 'success' }))
      .catch(error => alert.show(error.message, { type: 'error' }));
  }

  render() {
    const { classes, edition, navigationValue } = this.props;
    const { goBack } = this.state;

    if (goBack) {
      return (
        <Redirect to="/editions"/>
      );
    }

    return (
      <div className={classes.mainContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.backButton}
          onClick={() => this.setState({ goBack: true })}
        >
          <Icon className={classes.rightButtonIcon}>keyboard_arrow_left</Icon>
          Back
        </Button>
        <Typography className={classes.title} component="h1" variant="h2">
          {edition ? `Edition ${edition.name}` : 'Edition not found :('}
        </Typography>
        {!(edition && edition.participant) && edition.status === 'OPENED' ? <Button
          variant="contained"
          color="secondary"
          className={classes.joinButton}
          onClick={this.handleJoiningEdition}
        >
          <Icon className={classes.rightButtonIcon}>input</Icon>
          Join Edition
        </Button> : null}
        <Divider />
        {(edition && edition.status === 'OPENED') ? <div className={classes.editionNavigationContainer}>
          <BottomNavigation
            value={navigationValues[navigationValue]}
            showLabels
            className={classes.editionNavigation}
          >
            <BottomNavigationAction label="Products" component={Link} to={'products'} />
            <BottomNavigationAction label="Preferences" component={Link} to={'preferences'} />
            <BottomNavigationAction label="Groups" component={Link} to={'definedGroups'} />
          </BottomNavigation>
        </div> : null}
        { this.props.children }
      </div>
    );
  }
}

EditionPanelContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  navigationValue: PropTypes.oneOf(['products', 'preferences', 'definedGroups']),
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  joinEdition: () => (
    actions.editions.joinEdition(ownProps.edition.id)
  ),
}, dispatch);


export default withStyles(styles)(
  withAlert(connect(null, mapDispatchToProps)(EditionPanelContainer))
);

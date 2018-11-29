import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, withRouter } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
};

const pathValue = {
  '/editions': 0,
  '/': 0,
  '/account': 1,
  '/signout': 3,
  '/permissionRequests': 2,
};

class MainContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };
  }

  render() {
    const { classes, isModerator } = this.props;
    const { pathname } = this.props.location;

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={pathValue[pathname]}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Main Panel"
              component={Link}
              to="editions"
            />
            <Tab
              label="Account"
              component={Link}
              to="account"
            />
            {
              isModerator ? <Tab
                label="Requests"
                component={Link}
                to="permissionRequests"
              /> : null
            }
            <Tab
              label="Sign out"
              component={Link}
              to="signout"
            />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isModerator: state.auth.roles.includes('ROLE_MODERATOR'),
});


export default withStyles(styles)(withRouter(connect(mapStateToProps, null)(MainContainer)));

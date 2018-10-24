import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, withRouter } from 'react-router-dom';
import actions from '../../actions';


const styles = {
  root: {
    flexGrow: 1,
  },
};

const pathValue = {
  '/mainpanel': 0,
  '/': 0,
  '/account': 1,
  '/signout': 2,
};

class MainContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };
  }

  render() {
    const { classes } = this.props;
    const { pathname } = this.props.location;
    console.log(pathname);

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
              to="mainpanel"
            />
            <Tab
              label="Account"
              component={Link}
              to="account"
            />
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

// const mapDispatchToProps = dispatch => ({
//   updatePath: pathname => dispatch(actions.pathActions.updatePath(pathname)),
// });



export default withStyles(styles)(withRouter((connect(null, null)(MainContainer))));

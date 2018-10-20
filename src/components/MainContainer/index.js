import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { Redirect, Link } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
};

class MainContainer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value, route) => {
    this.setState({ value });
    return <Redirect to={route} />;
  };

  render() {
    const { classes, theme } = this.props;
    console.log(this.props);
    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              label="Item One"
              component={Link}
              to="mainpanel"
            />
            <Tab
              label="Item Two"
              component={Link}
              to="secondpanel"
            />
            <Tab label="Item Three" />
          </Tabs>
        </Paper>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {React.Children.only(this.props.children)}
        </SwipeableViews>
      </div>
    );
  }
}

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContainer);

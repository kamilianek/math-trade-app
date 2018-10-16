import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class EnsureLoggedInContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    const { isLoggedIn, location } = this.props;
    const pathname = location && location.pathname;

    if (!isLoggedIn) {
      switch (pathname) {
        default:
          return <Redirect to="/login"/>;
      }
    }

    if (this.props.children) {
      return this.props.children;
    }

    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    isLoggedIn: !!(auth && auth.token),
  };
};

export default connect(mapStateToProps)(EnsureLoggedInContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class EnsureLoggedInContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    const { isLoggedIn, location, editions } = this.props;
    const pathname = location && location.pathname;

    if (!isLoggedIn) {
      switch (pathname) {
        default:
          return <Redirect to="/login"/>;
      }
    }

    const parsedPath = pathname.split('/');

    // not allow accessing moderatorPanel if not moderator
    // or not CLOSED status
    if (parsedPath[1] === 'editions') {
      const currentEdition = parsedPath[2] && editions.filter(edition => `${edition.id}` === parsedPath[2]);

      if (parsedPath[3] === 'moderatorPanel') {
        if (!currentEdition || !currentEdition[0].moderator || currentEdition[0].status === 'OPENED') {
          return <Redirect to="/"/>;
        }
      }

      if (parsedPath[3] === 'products' || parsedPath[3] === 'preferences' || parsedPath[3] === 'definedGroups') {
        if (!currentEdition || currentEdition[0].status !== 'OPENED') {
          return <Redirect to="/" />;
        }
      }

      if (parsedPath[3] === 'results') {
        if (!currentEdition || (!currentEdition[0].participant && !currentEdition[0].moderator) || currentEdition[0].status !== 'PUBLISHED') {
          return <Redirect to="/" />;
        }
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
  const isLoggedIn = !!(auth && auth.token);

  return {
    isLoggedIn,
    editions: isLoggedIn && state.editions.items,
  };
};

export default connect(mapStateToProps)(EnsureLoggedInContainer);

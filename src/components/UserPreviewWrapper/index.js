import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withAlert } from 'react-alert';


import UserPreview from '../UserPreview';

import actions from '../../actions';

class UserPreviewWrapper extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const { fetchOtherUser, alert } = this.props;

    fetchOtherUser()
      .then(response => this.setState({ user: response }))
      .catch(() => alert.show('Cannot fetch user details', { type: 'error' }));
  }

  componentWillReceiveProps(nextProps) {
    const { fetchOtherUser, alert, userId } = this.props;
    if (nextProps.userId !== this.props.userId) {
      fetchOtherUser(nextProps.userId)
        .then(response => this.setState({ user: response }))
        .catch(() => alert.show('Cannot fetch user details', { type: 'error' }));
    }
  }

  render() {
    const { user } = this.state;
    console.log('user: ', user);
    return (
      user ? <UserPreview userData={user} /> : null
    );
  }
}

UserPreviewWrapper.propTypes = {
  userId: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    fetchOtherUser: userId => (
      actions.user.fetchOtherUser(!userId ? ownProps.userId : userId)
    ),
  }, dispatch);
};

export default withAlert(
  connect(null, mapDispatchToProps)(UserPreviewWrapper),
);

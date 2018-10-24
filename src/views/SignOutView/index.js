import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import actions from '../../actions';


class SignOutView extends React.Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (<Redirect to="/login" />);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signOut: actions.auth.signOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignOutView);

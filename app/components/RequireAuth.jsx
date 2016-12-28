import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    static propTypes = {
      auth: PropTypes.shape({
        authenticated: PropTypes.bool,
      }),
    }

    componentWillMount() {
      this.checkAuth(this.props.auth.authenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.auth.authenticated);
    }

    checkAuth(authenticated) {
      if (!authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
  });

  const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}

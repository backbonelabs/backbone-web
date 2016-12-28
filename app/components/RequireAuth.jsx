import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';

export default function (ComposedComponent) {
  class RequireAuth extends Component {

    static propTypes = {
      auth: PropTypes.shape({
        authenticated: PropTypes.bool,
      }),
      router: PropTypes.shape({
        push: PropTypes.func,
      }),
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
      authActions: PropTypes.shape({
        loginRedirect: PropTypes.func,
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
        this.props.authActions.loginRedirect(this.props.location.pathname);
        this.props.router.push('/login');
      }
    }

    render() {
      return (
        this.props.auth.authenticated && <ComposedComponent {...this.props} />
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

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}

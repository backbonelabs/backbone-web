import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';
import { bindActionCreators } from 'redux';
import * as authActions from '../../../actions/auth';
import * as userActions from '../../../actions/user';
import { spinnerColor } from '../../../utils/colorCodes';

import './RequireAuth.scss';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    static propTypes = {
      auth: PropTypes.shape({
        authenticated: PropTypes.bool,
        fetchingUser: PropTypes.bool,
      }),
      authActions: PropTypes.shape({
        loginRedirect: PropTypes.func,
      }),
      router: PropTypes.shape({
        push: PropTypes.func,
      }),
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }

    componentWillMount() {
      const { authenticated, fetchingUser } = this.props.auth;
      this.checkAuth(authenticated, fetchingUser);
    }

    componentWillReceiveProps(nextProps) {
      const { authenticated, fetchingUser } = nextProps.auth;
      this.checkAuth(authenticated, fetchingUser);
    }

    checkAuth(authenticated, fetchingUser) {
      // if fetching is false (finished fetching) and authenticated is false
      if (!authenticated && !fetchingUser) {
        this.props.authActions.loginRedirect(this.props.location.pathname);
        this.props.router.push('/login');
      }
    }

    render() {
      if (this.props.auth.fetchingUser) {
        return (
          <div className="require-auth-spinner">
            <MDSpinner singleColor={spinnerColor} size={40} />
          </div>
        );
      }
      return this.props.auth.authenticated && <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
    browser: state.browser,
  });

  const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}

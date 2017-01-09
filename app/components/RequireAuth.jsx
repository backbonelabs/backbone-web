import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { red500 } from 'material-ui/styles/colors';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth';
import * as userActions from '../actions/user';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    static propTypes = {
      auth: PropTypes.shape({
        authenticated: PropTypes.bool,
        inProgress: PropTypes.bool,
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
      const { authenticated, inProgress } = this.props.auth;
      this.checkAuth(authenticated, inProgress);
    }

    componentWillReceiveProps(nextProps) {
      const { authenticated, inProgress } = nextProps.auth;
      this.checkAuth(authenticated, inProgress);
    }

    checkAuth(authenticated, progress) {
      // if fetching is false (finished fetching) and authenticated is false
      if (!authenticated && !progress) {
        this.props.authActions.loginRedirect(this.props.location.pathname);
        this.props.router.push('/login');
      }
    }

    render() {
      if (this.props.auth.inProgress) {
        return (
          <div className="requireAuth_spinner">
            <CircularProgress color={red500} size={60} thickness={7} />
          </div>
        );
      }
      return this.props.auth.authenticated && <ComposedComponent {...this.props} />;
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

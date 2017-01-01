import React, { PropTypes } from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import store from './store';
import { loginRedirect } from './actions/auth';

// routes
import App from './components/App';
import Signup from './components/Signup/Signup';
import Login from './components/Signup/Login';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';

const requireAuth = (nextState, replace) => {
  // If there is no token present, redirect to login
  if (!localStorage.getItem('sessionId')) {
    store.dispatch(loginRedirect(nextState.location.pathname));
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const appRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/password-reset" component={PasswordReset} />
    <Route path="/protected-route" component={ProtectedRoute} onEnter={requireAuth} />
    <Route path="*" component={NotFound} />
  </Route>
);

const Routes = props => (
  <Router routes={appRoutes} history={props.history} />
);

Routes.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Routes;

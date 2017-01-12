import React, { PropTypes } from 'react';
import { Route, Router, IndexRoute } from 'react-router';

// routes
import App from './components/App';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import PasswordReset from './components/Auth/PasswordReset';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';
import RequireAuth from './components/RequireAuth';

const appRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/password-reset" component={PasswordReset} />
    <Route path="/protected-route" component={RequireAuth(ProtectedRoute)} />
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

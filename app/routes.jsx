import React, { PropTypes } from 'react';
import { Route, Router, IndexRoute } from 'react-router';

// routes
import App from './components/App';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import PasswordReset from './components/Auth/PasswordReset';
import RequestReset from './components/Auth/RequestReset';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import RequireAuth from './components/common/RequireAuth/RequireAuth';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

const appRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} title="Signup" />
    <Route path="/login" component={Login} title="Login" />
    <Route path="/password-reset" component={PasswordReset} title="Password Reset" />
    <Route path="/request-reset" component={RequestReset} title="Password Reset Request" />
    <Route path="/profile" component={RequireAuth(Profile)} />
    <Route path="/privacy-policy" component={PrivacyPolicy} title="Privacy Policy" />
    <Route path="*" component={NotFound} title="Not Found" />
  </Route>
);

const Routes = props => (
  <Router routes={appRoutes} history={props.history} />
);

Routes.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Routes;

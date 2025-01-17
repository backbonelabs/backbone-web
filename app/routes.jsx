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
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';
import TestimonialContest from './components/Legal/TestimonialContest';
import Business from './components/Business/Business';
// import Preorder from './components/Preorder/Preorder';

const appRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/business" component={Business} title="Business" />
    <Route path="/signup" component={Signup} title="Signup" />
    <Route path="/login" component={Login} title="Login" />
    <Route path="/password-reset" component={PasswordReset} title="Password Reset" />
    <Route path="/request-reset" component={RequestReset} title="Password Reset Request" />
    <Route path="/profile" component={RequireAuth(Profile)} />
    <Route path="/legal/privacy" component={PrivacyPolicy} title="Privacy Policy" />
    <Route path="/legal/terms" component={TermsOfService} title="Terms of Service" />
    <Route
      path="/legal/testimonial-contest"
      component={TestimonialContest}
      title="Testimonial Contest Official Rules"
    />
    <Route path="*" component={NotFound} title="Page Not Found" />
  </Route>
);

const Routes = props => (
  <Router routes={appRoutes} history={props.history} />
);

Routes.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Routes;

import React from "react";
import { Switch, Route } from "react-router-dom";
// Routes
import Home from "./Home/Home";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import PasswordReset from "./Auth/PasswordReset";
import RequestReset from "./Auth/RequestReset";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import RequireAuth from "./common/RequireAuth/RequireAuth";
import PrivacyPolicy from "./Legal/PrivacyPolicy";
import TermsOfService from "./Legal/TermsOfService";
import Business from "./Business/Business";
import Preorder from "./Preorder/Preorder";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/business" component={Business} title="Business" />
      <Route path="/pre-order" component={Preorder} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/password-reset" component={PasswordReset} />
      <Route path="/request-reset" component={RequestReset} />
      <Route path="/profile" component={RequireAuth(Profile)} />
      <Route path="/legal/privacy" component={PrivacyPolicy} />
      <Route path="/legal/terms" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;

import React, { PropTypes } from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import App from './components/App';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';

const appRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/signup" component={Signup} />
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

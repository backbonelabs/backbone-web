import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';
import { fetchUser } from './actions/user';
import store from './store';
import setAuthorizationToken from './utils/setAuthorizationToken';

import './global.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Check if there is a token
const token = localStorage.getItem('sessionId');
if (token !== null) {
  store.dispatch(fetchUser());
  setAuthorizationToken(token); // if there is a token, set all headers
}

const rootEl = document.getElementById('root');
const renderApp = (Component = routes) => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <AppContainer>
          <Component history={browserHistory} />
        </AppContainer>
      </MuiThemeProvider>
    </Provider>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default; // eslint-disable-line
    renderApp(NextApp);
  });
}

renderApp();

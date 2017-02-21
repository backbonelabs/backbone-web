import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import routes from './routes';
import { fetchUser } from './actions/user';
import store from './store';
import setAuthorizationToken from './utils/setAuthorizationToken';

import './global.scss';

// Check if there is a token
const token = localStorage.getItem('sessionId');
if (token !== null) {
  store.dispatch(fetchUser());
}
// set all headers
setAuthorizationToken(token);

const rootEl = document.getElementById('root');
const renderApp = (Component = routes) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component history={browserHistory} />
      </AppContainer>
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

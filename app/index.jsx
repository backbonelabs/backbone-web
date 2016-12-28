import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';
import reducers from './reducers';
import { isAuthenticated } from './actions/auth';

import './global.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// create store for redux
const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk),
);

// Check if there is a token
const token = localStorage.getItem('jwt');
if (token !== null) {
  store.dispatch(isAuthenticated());
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

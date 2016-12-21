import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';

import './global.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootEl = document.getElementById('root');
const renderApp = (Component = routes) => {
  ReactDOM.render(
    <MuiThemeProvider>
      <AppContainer>
        <Component history={browserHistory} />
      </AppContainer>
    </MuiThemeProvider>,
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

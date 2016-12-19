import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

import './global.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const rootEl = document.getElementById('root');
const renderApp = (Component = App) => {
  ReactDOM.render(
    <MuiThemeProvider>
      <AppContainer>
        <Component />
      </AppContainer>
    </MuiThemeProvider>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default; // eslint-disable-line
    renderApp(NextApp);
  });
}

renderApp();

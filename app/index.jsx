import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';

import App from './components/App';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

const rootEl = document.getElementById('root'); // eslint-disable-line
const renderApp = (Component = App) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default // eslint-disable-line
    renderApp(NextApp);
  });
}

renderApp();

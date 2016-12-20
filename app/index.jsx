import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from './routes';

import './global.scss';

const rootEl = document.getElementById('root');
const renderApp = (Component = routes) => {
  ReactDOM.render(
    <AppContainer>
      <Component history={browserHistory} />
    </AppContainer>,
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

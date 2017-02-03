import React from 'react';
import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';
import './NotFound.scss';

const NotFound = () => (
  <div className="not-found__outer-container">
    <Container>
      <Panel className="mui--text-center not-found__inner-container">
        <h1>404</h1>
        <div>
          <h2>Oh oh. The page you were looking for does not exist.</h2>
          <p>
            Contact <a href="mailto:support@gobackbone.com">support@gobackbone.com</a> if
            you need assistance.
          </p>
        </div>
      </Panel>
    </Container>
  </div>
);

export default NotFound;

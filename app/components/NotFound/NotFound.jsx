import React from 'react';
import Paper from 'material-ui/Paper';
import './NotFound.scss';

const NotFound = () => (
  <div className="not-found__outer-container">
    <Paper zDepth={1} className="not-found__inner-container">
      <div className="text-center">
        <h1>404</h1>
        <div>
          <h2>Oh oh. The page you were looking for does not exist.</h2>
          <p>
            Contact <a href="mailto:support@gobackbone.com">support@gobackbone.com</a> if
            you need assistance.
          </p>
        </div>
      </div>
    </Paper>
  </div>
);

export default NotFound;

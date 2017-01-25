/* eslint-disable react/no-danger */
import React from 'react';
import Paper from 'material-ui/Paper';
import privacyPolicy from '../../static/privacy-policy.html';
import './PrivacyPolicy.scss';

const PrivacyPolicy = () => (
  <div className="outer-container">
    <Paper zDepth={1}>
      <div className="inner-container" dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
    </Paper>
  </div>
);

export default PrivacyPolicy;

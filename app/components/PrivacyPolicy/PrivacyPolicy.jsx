import React from 'react';
import privacyPolicy from '../../static/privacy-policy.html';

const PrivacyPolicy = () => (
  <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} /> // eslint-disable-line react/no-danger
);

export default PrivacyPolicy;

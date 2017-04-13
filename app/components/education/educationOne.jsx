import React from 'react';
import renderHTML from 'react-render-html';

import htmlFile from '../../../server/views/educationone.html';

const EducationOne = () => (
  <div>
    {renderHTML(htmlFile)}
  </div>
);

export default EducationOne;

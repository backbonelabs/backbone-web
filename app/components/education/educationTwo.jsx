import React from 'react';
import renderHTML from 'react-render-html';

import htmlFile from '../../../server/views/educationtwo.html';

const EducationTwo = () => (
  <div>
    {renderHTML(htmlFile)}
  </div>
);

export default EducationTwo;

import React, { PropTypes } from 'react';
import Navbar from './Navbar/Navbar';

const App = props => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;

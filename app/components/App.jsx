import React, { PropTypes } from 'react';
import Navbar from './Navbar/Navbar';

const App = props => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;

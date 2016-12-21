import React, { PropTypes } from 'react';
import Navbar from './Navbar/Navbar';

const App = props => (
  <div>
    <Navbar />
    <main>
      {props.children}
    </main>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;

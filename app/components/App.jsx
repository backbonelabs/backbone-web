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
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;

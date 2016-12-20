import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';
import { Button } from 'react-toolbox/lib/button';

import styles from './Navbar.scss';

const Navbar = () => (
  <AppBar title="Backbone Labs, Inc" theme={styles}>
    <Navigation type="horizontal">
      <Link to="/">
        <Button label="Home" flat inverse />
      </Link>
      <Link to="login">
        <Button label="Login" flat inverse />
      </Link>
    </Navigation>
  </AppBar>
);

export default Navbar;

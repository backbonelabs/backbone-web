import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import './Navbar.scss';

const Navbar = () => (
  <Toolbar className="navBar">
    <ToolbarGroup>
      <ToolbarTitle text="Backbone Labs, Inc" />
    </ToolbarGroup>
    <ToolbarGroup>
      <div>
        <Link to="/">
          <FlatButton label="Home" hoverColor={'white'} />
        </Link>
        <Link to="/login">
          <FlatButton label="Login" hoverColor={'white'} />
        </Link>
      </div>
    </ToolbarGroup>
  </Toolbar>
);

export default Navbar;

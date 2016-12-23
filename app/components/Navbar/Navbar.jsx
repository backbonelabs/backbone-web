import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import './Navbar.scss';

const Navbar = () => (
  <Toolbar className="navBar">
    <ToolbarGroup />
    <ToolbarGroup>
      <div>
        <Link to="/">
          <FlatButton label="Home" hoverColor="#F44336" />
        </Link>
        <Link to="/signup">
          <FlatButton label="sign up" hoverColor="#F44336" />
        </Link>
      </div>
    </ToolbarGroup>
  </Toolbar>
);

export default Navbar;

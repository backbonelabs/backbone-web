import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import './Navbar.scss';

const Navbar = () => (
  <Toolbar className="navbar-background">
    <ToolbarGroup>
      Backbone Labs, Inc
    </ToolbarGroup>
  </Toolbar>
);

export default Navbar;

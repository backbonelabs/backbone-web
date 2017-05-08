import React, { PropTypes } from "react";
import Media from "react-media";
import Button from "muicss/lib/react/button";
import { NavLink } from "react-router-dom";

import BackboneLogo from "../../images/backbone-logo-white.svg";

import "./Navbar.css";

const Navbar = ({ openSideNav }) => {
  const desktop = (
    <ul>
      <li>
        <NavLink to="/"><img src={BackboneLogo} alt="Backbone logo" /></NavLink>
      </li>
      <li>
        <NavLink to="/business" activeClassName="active">Business</NavLink>
      </li>
      <li><a href="https://support.gobackbone.com">Support</a></li>
      <li>
        <NavLink to="/pre-order">
          <Button color="danger">Pre-order</Button>
        </NavLink>
      </li>
    </ul>
  );
  const mobile = (
    <ul>
      <li>
        <NavLink to="/"><img src={BackboneLogo} alt="Backbone logo" /></NavLink>
      </li>
      <li className="fill" />
      {/*eslint-disable*/}
      <li><i className="fa fa-bars" onClick={openSideNav} /></li>
      {/*eslint-disable*/}
    </ul>
  );
  return (
    <nav className="navBar">
      <Media query="(max-width: 768px)">
        {matches => (matches ? mobile : desktop)}
      </Media>
    </nav>
  );
};

Navbar.propTypes = {
  openSideNav: PropTypes.func
};

export default Navbar;

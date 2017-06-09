import React, { PropTypes } from 'react';
import Media from 'react-media';
import Button from 'muicss/lib/react/button';
import { Link } from 'react-router';

import BackboneLogo from '../../images/backbone-logo-white.svg';

import './Navbar.scss';

const Navbar = ({ toggleSideNav }) => {
  const desktop = (
    <ul>
      <li>
        <Link to="/"><img src={BackboneLogo} alt="Backbone logo" /></Link>
      </li>
      <li><Link to="/business" activeClassName="active">Business</Link></li>
      <li><a href="https://support.gobackbone.com">Support</a></li>
      <li>
        <a href="https://shop.gobackbone.com/products/backbone-the-worlds-smartest-posture-support">
          <Button color="primary">Pre-order</Button>
        </a>
      </li>
    </ul>
  );
  const mobile = (
    <ul>
      <li>
        <Link to="/" onClick={toggleSideNav}><img src={BackboneLogo} alt="Backbone logo" /></Link>
      </li>
      <li className="fill" />
      {/*eslint-disable*/}
      <li><i className="fa fa-bars" onClick={toggleSideNav} /></li>
      {/*eslint-disable*/}
    </ul>
  );
  return (
    <nav className="navbar" role="navigation">
      <Media query="(max-width: 768px)">
        {matches => (matches ? mobile : desktop)}
      </Media>
    </nav>
  );
};

Navbar.propTypes = {
  toggleSideNav: PropTypes.func
};

export default Navbar;

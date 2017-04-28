import React, { PropTypes } from 'react';
import Media from 'react-media';
import Button from 'muicss/lib/react/button';
import { Link } from 'react-router';

import BackboneLogo from '../../images/backbone-logo-white.svg';

import './Navbar.scss';

const Navbar = ({ openSideNav }) => {
  const desktop = (
    <nav className="navBar">
      <ul>
        <li>
          <Link to="/"><img src={BackboneLogo} alt="Backbone logo" /></Link>
        </li>
        <li><Link to="/business" activeClassName="active">Business</Link></li>
        <li><a href="https://support.gobackbone.com">Support</a></li>
        <li>
          <Link to="/preorder">
            <Button color="danger">Pre-order</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
  const mobile = (
    <nav className="navBar">
      <ul>
        <li>
          <Link to="/"><img src={BackboneLogo} alt="Backbone logo" /></Link>
        </li>
        <li className="fill" />
        <li><i className="fa fa-bars" onClick={openSideNav} /></li>
      </ul>
    </nav>
  );
  return (
    <div>
      <Media query="(max-width: 768px)">
        {matches => (matches ? mobile : desktop)}
      </Media>
    </div>
  );
};

Navbar.propTypes = {
  openSideNav: PropTypes.func,
};

export default Navbar;

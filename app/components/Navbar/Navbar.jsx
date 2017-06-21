import React, { PropTypes } from 'react';
import Media from 'react-media';
import Button from 'muicss/lib/react/button';
import { Link } from 'react-router';

import BackboneLogo from '../../images/backbone-logo-white.svg';

import './Navbar.scss';

const Navbar = ({ openSideNav }) => {
  const desktop = (
    <ul>
      <li>
        {/* UPDATE THIS TO <Link to="/"> AFTER WE REMOVE THE SHOPIFY REDIRECT */}
        <a href="https://shop.gobackbone.com"><img src={BackboneLogo} alt="Backbone logo" /></a>
      </li>
      <li><Link to="/business" activeClassName="active">Business</Link></li>
      <li><a href="https://support.gobackbone.com">Support</a></li>
      <li>
        <a href="https://shop.gobackbone.com/products/backbone">
          <Button color="danger">Pre-order</Button>
        </a>
      </li>
    </ul>
  );
  const mobile = (
    <ul>
      <li>
        {/* UPDATE THIS TO <Link to="/"> AFTER WE REMOVE THE SHOPIFY REDIRECT */}
        <a href="https://shop.gobackbone.com"><img src={BackboneLogo} alt="Backbone logo" /></a>
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

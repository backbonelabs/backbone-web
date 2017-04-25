import React from 'react';
import BackboneLogo from '../../images/backbone-logo-white.svg';
import './Navbar.scss';

const Navbar = () => (
  <nav className="navBar">
    <ul>
      <li><img src={BackboneLogo} alt="Backbone logo" /></li>
      <li>Product</li>
      <li>Testimonials</li>
      <li>Contact us</li>
      <li style={{ flex: 1 }} />
      <li>Businesses</li>
      <li>Support</li>
      <li>Pre-order</li>
    </ul>
  </nav>
);

export default Navbar;

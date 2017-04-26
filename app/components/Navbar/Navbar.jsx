import React from 'react';
import { Link } from 'react-router';

import BackboneLogo from '../../images/backbone-logo-white.svg';

import './Navbar.scss';

const Navbar = () => (
  <nav className="navBar">
    <ul>
      <li>
        <Link to="/"><img src={BackboneLogo} alt="Backbone logo" /></Link>
      </li>
      <li><Link to="/business" activeClassName="active">Business</Link></li>
      <li>Support</li>
      <li>
        {/*eslint-disable*/}
        <a href="https://www.kickstarter.com/projects/gobackbone/backbone-the-smart-easy-way-to-a-healthy-back">
          Pre-order
        </a>
        {/*eslint-disable*/}
      </li>
    </ul>
  </nav>
);

export default Navbar;

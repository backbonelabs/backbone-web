import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router';

import './Footer.scss';

const Footer = () => (
  <div className="footer">
    <Container fluid>
      <Row>
        <Col md="12" lg="9" className="footer__leftside">
          <Link to="/legal/privacy">Privacy Policy</Link>
          <Link to="/legal/terms">Terms of Service</Link>
          <a
            href="https://shop.gobackbone.com/pages/terms-conditions-for-online-offers-to-purchase"
          >
            Terms & Conditions
          </a>
          <a href="https://shop.gobackbone.com/pages/returns-policy">Return Policy</a>
          <a href="https://support.gobackbone.com">Support</a>
        </Col>
        <Col md="12" lg="3" className="footer__rightside">
          <a href="https://www.instagram.com/backbonelabsinc/">
            <i className="fa fa-instagram" />
          </a>
          <a href="https://twitter.com/backbonelabsinc">
            <i className="fa fa-twitter" />
          </a>
          <a href="https://www.facebook.com/BackboneLabsInc/">
            <i className="fa fa-facebook" />
          </a>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;

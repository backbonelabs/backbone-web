import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import { scroller } from 'react-scroll';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import appStoreBadge from '../../images/app-store-badge.svg';
import playStoreBadge from '../../images/play-store-badge.svg';
import logo from '../../images/logo.png';
import './Home.scss';

const scrollToContact = () => {
  scroller.scrollTo('home__contact', {
    duration: 1500,
    delay: 100,
    smooth: true,
  });
};
const scrollToProduct = () => {
  scroller.scrollTo('home__product', {
    duration: 1500,
    delay: 100,
    smooth: true,
  });
};

class Home extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      sentBy: '',
      message: '',
    };
  }

  @autobind handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  @autobind handleOnSubmit(evt) {
    evt.preventDefault();
    const { email } = this.state;

    if (email) {
      post('/mailing-list', { email })
        .then((res) => {
          this.setState({ success: res.data.success, error: '' });
        })
        .catch((err) => {
          this.setState({ error: err.response.data.error, success: '' });
        });
    }
  }

  render() {
    return (
      <div className="home">
        <div className="home__bg-image" />
        <div className="home__jumbo">
          <div className="home__jumbo-header">
            <img
              className="home__logo"
              src={logo}
              alt="Man wearing a Backbone"
            />
            <div>
              <a href="https://itunes.apple.com/us/app/backbone-smart-posture/id1184998773">
                <img
                  className="home__app-badge"
                  alt="Download from the App Store"
                  src={appStoreBadge}
                />
              </a>
              {/*eslint-disable*/}
              <a href="https://play.google.com/store/apps/details?id=co.backbonelabs.backbone&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                {/*eslint-disable*/}
                <img
                  className="home__app-badge"
                  alt="Download from Google Play"
                  src={playStoreBadge}
                />
              </a>
            </div>

            <Button color="danger" onClick={scrollToContact}>
              Contact us
            </Button>
            <div className="home__arrow" onClick={scrollToProduct}>
              <i className="fa fa-chevron-down" aria-hidden="true" />
            </div>
          </div>
        </div>
        <section className="home__product" id="home__product">
          <Container fluid>
            <Row>
              <Col md="6">
                <div className="product-info">
                  <h1>
                    Achieving great posture is now physically and mentally easier than ever
                  </h1>
                  <p>
                    Our ergonomic brace is crafted from a blend of technical fabrics to produce
                    a slim, low-profile form of support for your posture that’s comfortable,
                    breathable, and moisture-resistant.
                  </p>
                </div>
              </Col>
              <Col md="6" className="img-container posture-brace" />
            </Row>
          </Container>
        </section>
        <section className="home__product">
          <Container fluid>
            <Row>
              <Col md="6" className="img-container sensor-module" />
              <Col md="6">
                <div className="product-info">
                  <h1>Gently buzzes every time you slouch</h1>
                  <p>
                    Our sensor module utilizes a series of high-tech components to
                    analyze your posture and gently reminds you to sit or
                    stand up straight by vibrating anytime you slouch.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__product">
          <Container fluid>
            <Row>
              <Col md="6">
                <div className="product-info">
                  <h1>Get even more</h1>
                  <p>
                    Our mobile application allows us to wirelessly deliver an endless
                    stream of new features and updates to your smartphone...
                    allowing your Backbone to do even more than you ever expected.
                  </p>
                </div>
              </Col>
              <Col md="6" className="img-container mobile-application" />
            </Row>
          </Container>
        </section>
        <section className="home__testimonials">
          <Container fluid className="mui--text-center">
            <h1>What Customers are Saying</h1>
            <Row>
              <Col md="6" className="testimonials-container">
                <div>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    Miguel is the best engineer I know, my god this guy is freaking good. I want to be just like him when I grow up. More lube please!
                  </p>
                  <p>-Khoa Phan</p>
                </div>
              </Col>
              <Col md="6" className="testimonials-container">
                <div>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    Miguel is a legend, what more can I say?
                  </p>
                  <p>-Kevin Huang</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__videos">
          <Container fluid>
            <Row>
              <Col md="6" sm="12">
                <div className="video-container">
                  <iframe
                    frameBorder="0"
                    src="https://www.youtube.com/embed/GdpYCI-FAww"
                  />
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="video-container">
                  <iframe
                    frameBorder="0"
                    src="https://www.youtube.com/embed/_n2rmccXI9M"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__contact" id="home__contact">
          <Container className="mui--text-center">
            <h1>Contact Us</h1>
            <p>Leave us any feedback or questions below.</p>
            <form>
              <Row>
                <Col md="6">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleOnChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleOnChange}
                  />
                  <input
                    type="text"
                    placeholder="Phone number (optional)"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="6">
                  <div>
                    <select
                      value={this.state.sentBy}
                      name="sentBy"
                      onChange={this.handleOnChange}
                      required
                    >
                      <option value="" hidden>I am a ....</option>
                      <option value="customer">Customer</option>
                      <option value="investor">Investor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <textarea
                    name="message"
                    type="text"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="12" className="mui--text-center">
                  <Button color="danger">Send</Button>
                </Col>
              </Row>
            </form>
          </Container>
        </section>
      </div>
    );
  }
}

export default Home;

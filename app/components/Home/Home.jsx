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
      phoneNum: '',
      sentBy: '',
      message: '',
      formError: '',
      confirmMessage: '',
    };
  }

  @autobind handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  @autobind handleOnSubmit(evt) {
    evt.preventDefault();
    const { email, name, sentBy, message, phoneNum } = this.state;

    // just check that it's not an empty form
    if (!email || !name || !sentBy || !message) {
      return this.setState({
        formError: 'The highlighted fields are required',
      });
    }

    return post('/mail/contact', {
      email,
      name,
      sentBy,
      message,
      phoneNum,
    })
      .then(() => {
        // clear form
        this.setState({
          name: '',
          email: '',
          phoneNum: '',
          message: '',
          formError: '',
          confirmMessage: "Thanks for the message. We'll get back to you shortly.",
        });
      })
      .catch((err) => {
        this.setState({
          formError: (err.response &&
            err.response.data &&
            err.response.data.error) ||
            err.message,
          confirmMessage: '',
        });
      });
  }

  render() {
    return (
      <div className="home">
        <div className="home__bg-image">
          <div className="home__jumbo">
            <div className="home__jumbo-header">
              <h1 className="home__jumbo-text">
                Sit up, don’t sit out
              </h1>
              <div>
                <a href="https://itunes.apple.com/us/app/backbone-smart-posture/id1184998773">
                  <img
                    className="home__app-badge"
                    alt="Download from the App Store"
                    src={appStoreBadge}
                  />
                </a>
                {/*eslint-disable*/}
                <a href="https://play.google.com/store/apps/details?id=co.backbonelabs.backbone">
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
            </div>
            <div className="home__arrow">
              <i
                onClick={scrollToProduct}
                className="fa fa-chevron-down"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <section className="home__product" id="home__product">
          <Container fluid>
            <Row>
              <Col md="6" className="img-container posture-brace" />
              <Col md="6">
                <div className="product-info">
                  <h1>
                    Backbone makes achieving great posture comfortable and easy
                  </h1>
                  <p>
                    The ergonomic brace is crafted from a blend of technical fabrics to produce a slim, low-profile form of support for your posture that’s comfortable, breathable, and moisture-resistant.
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
                  <h1>Gently buzzes every time you slouch</h1>
                  <p>
                    Backbone’s sensor module utilizes a series of high-tech components to analyze your posture and gently reminds you to sit or stand up straight by vibrating anytime you slouch.
                  </p>
                </div>
              </Col>
              <Col md="6" className="img-container sensor-module" />
            </Row>
          </Container>
        </section>
        <section className="home__product">
          <Container fluid>
            <Row>
              <Col md="6" className="img-container mobile-application" />
              <Col md="6">
                <div className="product-info">
                  <h1>Backbone gives you even more</h1>
                  <p>
                    The mobile application allows us to wirelessly deliver a constant stream of new features and updates to your smartphone... giving your Backbone the ability to do even more than you ever expected.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__testimonials">
          <Container fluid className="mui--text-center">
            <h1>What Our Customers are Saying</h1>
            <Row>
              <Col md="12" lg="4" className="testimonials-container">
                <div>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    Overall I do feel better at the end of the day with the support and posture reminders. Good job Backbone team.
                    <span>- Ryan H</span>
                  </p>
                </div>
              </Col>
              <Col md="12" lg="4" className="testimonials-container">
                <div>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    I’ve had no issues with it so far. I really like it, and I hope these guys stick with it, because it seems like a lot of additional useful functionality could be added to the app in the future.
                    <span>- BH</span>
                  </p>
                </div>
              </Col>
              <Col md="12" lg="4" className="testimonials-container">
                <div>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    Got mine yesterday. After a quick update, the Backbone worked as advertised. If you truly have back issues, I highly recommend you keep your pledge.
                    <span>- Tom M</span>
                  </p>
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
                    src="https://www.youtube.com/embed/GdpYCI-FAww?rel=0&showinfo=0&controls=0"
                  />
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="video-container">
                  <iframe
                    frameBorder="0"
                    src="https://www.youtube.com/embed/e3vSfTeXXtE?rel=0&showinfo=0&controls=0"
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
            <form onSubmit={this.handleOnSubmit}>
              <Row>
                <Col md="6">
                  <input
                    className={
                      !this.state.name && this.state.formError
                        ? "required-field"
                        : null
                    }
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleOnChange}
                  />
                  <input
                    className={
                      !this.state.email && this.state.formError
                        ? "required-field"
                        : null
                    }
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleOnChange}
                  />
                  <input
                    type="text"
                    placeholder="Phone number (optional)"
                    name="phoneNum"
                    value={this.state.phoneNum}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="6">
                  <div>
                    <select
                      className={
                        !this.state.sentBy && this.state.formError
                          ? "required-field"
                          : null
                      }
                      value={this.state.sentBy}
                      name="sentBy"
                      onChange={this.handleOnChange}
                    >
                      <option value="" hidden>I am a ....</option>
                      <option value="customer">Customer</option>
                      <option value="investor">Investor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <textarea
                    className={
                      !this.state.message && this.state.formError
                        ? "required-field"
                        : null
                    }
                    name="message"
                    type="text"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="12" className="mui--text-center">
                  {this.state.formError
                    ? <p className="error-message">
                        {this.state.formError}
                      </p>
                    : null}
                  {this.state.confirmMessage
                    ? <p className="error-message">
                        {this.state.confirmMessage}
                      </p>
                    : null}
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

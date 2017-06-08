import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import Divider from 'muicss/lib/react/divider';
import Modal from 'react-modal';
import './Home.scss';

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
      showModal: false,
    };
  }

  @autobind
  toggleModal() {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  }

  @autobind
  handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  @autobind
  handleOnSubmit(evt) {
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
        <section className="home__hero">
          <video autoPlay="autoplay" loop="loop" muted="muted" className="home__hero_video">
            <source src="https://cdn.gobackbone.com/assets/backbone.mp4" />
          </video>
          <div className="home__hero_content">
            <h1 className="responsive-text-display2">Backbone</h1>
            <h4 className="responsive-text-display1 mui--text-center">
              The smart, lightweight, posture solution
            </h4>
            <Button
              className="home__hero_button"
              size="large"
              color="danger"
              onClick={this.toggleModal}
            >
              Watch the Video
            </Button>
          </div>
        </section>
        <Modal
          contentLabel="Backbone video modal"
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          style={{
            overlay: {
              zIndex: 1000,
            },
          }}
        >
          <div className="home__modal">
            <div>
              <a
                className="home__modal_close"
                onClick={this.toggleModal}
                role="button"
              >
                <i className="material-icons">clear</i>
              </a>
            </div>
            <Row>
              <Col xs="12">
                {/* eslint-disable max-len */}
                <iframe
                  title="Backbone marketing video"
                  src="https://www.youtube.com/embed/iTplWYkig-o?autoplay=1&amp;rel=0&amp;controls=0&amp;modestbranding=1&amp;showinfo=0"
                  frameBorder="0"
                  allowFullScreen
                />
                {/* eslint-enable max-len */}
              </Col>
            </Row>
          </div>
        </Modal>
        <div className="home__funding-status">
          <Container>
            <div className="flex-row">
              <Col
                className="mui--text-center flex-row-item--middle"
                xs="12"
                lg="7"
                lg-offset="1"
              >
                <div className="responsive-text-display1">
                  We sold <strong>$467,833</strong> on Kickstarter in just 30 days!
                </div>
              </Col>
              <Col
                xs="8"
                xs-offset="2"
                sm="6"
                sm-offset="3"
                lg="3"
                lg-offset="0"
                className="mui--text-center flex-row-item--middle"
              >
                <div>
                  {/* eslint-disable max-len */}
                  <a
                    className="buy-btn"
                    href="https://shop.gobackbone.com/products/backbone-the-worlds-smartest-posture-support"
                  >
                    Pre-Order Now
                  </a>
                  {/* eslint-enable max-len */}
                </div>
              </Col>
            </div>
          </Container>
        </div>
        <div className="home__press mui--text-center">
          <img
            className="home__image-contain"
            src="https://cdn.gobackbone.com/assets/press.png"
            alt="Press mentions of Backbone"
          />
        </div>
        <section className="home__section home__posture">
          <h2 className="home__section_title responsive-text-display2 mui--text-center">
            Why is Posture Important?
          </h2>
          <Container>
            <Row>
              <Col md="6" lg="5" lg-offset="1">
                <Panel className="home__posture_pro-cons">
                  <h2><strong>Good Posture</strong></h2>
                  <ul className="mui-list--unstyled home__posture_pro-cons--good">
                    <li>
                      <i className="material-icons">check_circle</i> Makes you look taller and
                      fitter
                    </li>
                    <li>
                      <i className="material-icons">check_circle</i> Reduces and prevents back pain
                    </li>
                    <li>
                      <i className="material-icons">check_circle</i> Increases focus and confidence
                    </li>
                  </ul>
                </Panel>
              </Col>
              <Col md="6" lg="5">
                <Panel className="home__posture_pro-cons">
                  <h2><strong>Bad Posture</strong></h2>
                  <ul className="mui-list--unstyled home__posture_pro-cons--bad">
                    <li>
                      <i className="material-icons">clear</i> Causes neck and back pain
                    </li>
                    <li>
                      <i className="material-icons">clear</i> Lowers energy levels
                    </li>
                    <li>
                      <i className="material-icons">clear</i> Looks unattractive
                    </li>
                  </ul>
                </Panel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__section home__features">
          <Container>
            <Row>
              <div className="home__section_title mui--text-center">
                <h2 className="responsive-text-display2 mui--text-center">
                  Introducing Backbone
                </h2>
                <h4 className="responsive-text-title mui--text-center">
                  <i>The World's Smartest Posture Wearable</i>
                </h4>
              </div>
              <Col lg="10" lg-offset="1">
                <Row className="home__features_row flex-row">
                  <Col md="7">
                    <img
                      className="home__image-contain"
                      src="https://cdn.gobackbone.com/assets/shoulder-strap.jpg"
                      alt="Front shoulder view of the Backbone brace"
                    />
                  </Col>
                  <Col md="5" className="home__features_text-container">
                    <Panel className="home__features_card flex-row-item--middle">
                      <h2 className="home__features_card-title"><strong>SUPPORTS</strong></h2>
                      <ul className="home__features_card-list">
                        <li className="home__features_card-list-item">
                          Aligns your shoulders and back to help you maintain good posture easily
                        </li>
                        <li className="home__features_card-list-item">
                          Fits comfortably under your clothes without being noticed
                        </li>
                      </ul>
                    </Panel>
                  </Col>
                </Row>
                <Row className="home__features_row flex-row">
                  <Col md="5" className="home__features_text-container">
                    <Panel className="home__features_card flex-row-item--middle">
                      <h2 className="home__features_card-title"><strong>SENSES</strong></h2>
                      <ul className="home__features_card-list">
                        <li className="home__features_card-list-item">
                          Helps you build good habits by intelligently alerting you when you slouch
                        </li>
                        <li className="home__features_card-list-item">
                          Gently reminds you when you've been sitting too long
                        </li>
                      </ul>
                    </Panel>
                  </Col>
                  <Col md="7">
                    <img
                      className="home__image-contain"
                      src="https://cdn.gobackbone.com/assets/module-floating-angled.jpg"
                      alt="Backbone sensor module"
                    />
                  </Col>
                </Row>
                <Row className="home__features_row flex-row">
                  <Col md="7">
                    <img
                      className="home__image-contain"
                      src="https://cdn.gobackbone.com/assets/app-screens-final.jpg"
                      alt="Backbone app screenshots"
                    />
                  </Col>
                  <Col md="5" className="home__features_text-container">
                    <Panel className="home__features_card flex-row-item--middle">
                      <h2 className="home__features_card-title"><strong>ENGAGES</strong></h2>
                      <ul className="home__features_card-list">
                        <li className="home__features_card-list-item">
                          Guides you through interactive training programs to keep you committed
                        </li>
                        <li className="home__features_card-list-item">
                          Recommends posture-strengthening exercises and stretches to get
                          you real results
                        </li>
                      </ul>
                    </Panel>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__section home__testimonials">
          <Container>
            <h2 className="home__section_title responsive-text-display2 mui--text-center">
              Customers Love Backbone
            </h2>
            <Row>
              <Col md="10" lg="8">
                <Panel className="home__testimonials_card">
                  <i className="fa fa-quote-left" aria-hidden="true" />
                  The more I use this, the more I like it... Using the backbone is like
                  mindfulness of posture on steroids. This is so awesome, thanks!
                  <span className="home__testimonials_card-name">- Tom M.</span>
                </Panel>
              </Col>
              <Col md="10" md-offset="2" lg="8" lg-offset="4">
                <Panel className="home__testimonials_card">
                  <i className="fa fa-quote-left" aria-hidden="true" />
                  I received my backbone and am VERY pleased and happy with the product...
                  The backbrace by itself has already helped me pull my shoulders back and
                  improve my standing posture without being in a posture session!
                  <span className="home__testimonials_card-name">- Christopher M.</span>
                </Panel>
              </Col>
              <Col md="10" lg="8">
                <Panel className="home__testimonials_card">
                  <i className="fa fa-quote-left" aria-hidden="true" />
                  I’ve had no issues with it so far. I really like it, and I hope these guys
                  stick with it, because it seems like a lot of additional useful functionality
                  could be added to the app in the future.
                  <span className="home__testimonials_card-name">- Billy H.</span>
                </Panel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__section home__buy">
          <Container>
            <Row>
              <Col lg="10" lg-offset="1">
                <Row className="flex-row">
                  <Col xs="12" md="7" className="flex-row-item--middle">
                    <img
                      className="home__image-contain"
                      src="https://cdn.gobackbone.com/assets/floating-brace-with-module.png"
                      alt="Backbone brace"
                    />
                  </Col>
                  <Col xs="12" md="5" className="flex-row-item--middle">
                    <div className="responsive-text-display1 home__buy_title">
                      Backbone &mdash; <span className="strikethrough">$119</span> <span>$69</span>
                    </div>
                    <div className="mui--text-subhead home__buy_subtitle">
                      90-day money back guarantee
                    </div>
                    <Divider className="home__buy_divider" />
                    <div>
                      <p>You'll get:</p>
                      <ul>
                        <li>Smart Backbone brace</li>
                        <li>Charging cable</li>
                        <li>Smartphone app (Android &amp; iOS)</li>
                        <li>Unlimited updates (new features, in-app videos, and more)</li>
                      </ul>
                      <p className="mui--text-caption">
                        App compatibility: Android 4.3 and up, iOS 9.0 and up
                      </p>
                    </div>
                    <div className="mui--text-center">
                      {/* eslint-disable max-len */}
                      <a
                        className="buy-btn"
                        href="https://shop.gobackbone.com/products/backbone-the-worlds-smartest-posture-support"
                      >
                        Pre-Order Now
                      </a>
                      {/* eslint-enable max-len */}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__section home__contact">
          <Container className="mui--text-center">
            <h2 className="home__section_title responsive-text-display2 mui--text-center">
              Contact Us
            </h2>
            <form onSubmit={this.handleOnSubmit}>
              <Row>
                <Col md="6">
                  <input
                    className={
                      !this.state.name && this.state.formError && 'required-field'
                    }
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleOnChange}
                  />
                  <input
                    className={
                      !this.state.email && this.state.formError && 'required-field'
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
                        !this.state.sentBy && this.state.formError && 'required-field'
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
                      !this.state.message && this.state.formError && 'required-field'
                    }
                    name="message"
                    type="text"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="12" className="mui--text-center">
                  {this.state.formError && (
                    <p className="error-message">
                      {this.state.formError}
                    </p>
                  )}
                  {this.state.confirmMessage && (
                    <p className="error-message">
                      {this.state.confirmMessage}
                    </p>
                  )}
                  <Button size="large" color="danger">Send</Button>
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

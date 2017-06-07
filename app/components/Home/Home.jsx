import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import { scroller } from 'react-scroll';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import './Home.scss';

const scrollToContact = () => {
  scroller.scrollTo('home__contact', {
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
            <h1 className="mui--text-display3">Backbone<sup>&trade;</sup></h1>
            <h4 className="mui--text-display1">The smart, lightweight, posture solution</h4>
            <Button
              className="home__hero_button"
              size="large"
              color="danger"
            >
              Watch the Video
            </Button>
          </div>
        </section>
        <div className="home__funding-status">
          <Container>
            <Row>
              <Col
                className="mui--text-title mui--text-center"
                sm="6"
                md="4"
                sm-offset="1"
                md-offset="3"
              >
                <div className="home__funding-status_mainline">
                  <strong>$467,000</strong> sold in 30 days
                </div>
                <div className="mui--text-caption">
                  The biggest 30-day crowdfunding campaign in history
                </div>
              </Col>
              <Col sm="3" className="mui--text-center">
                <Button>Pre-Order Now</Button>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="home__press mui--text-center">
          <img
            className="home__press_image"
            src="https://cdn.gobackbone.com/assets/press.png"
            alt="Press mentions of Backbone"
          />
        </div>
        <section className="home__section home__posture">
          <h2 className="home__section_title mui--text-display2 mui--text-center">
            Why is Posture Important?
          </h2>
          <Container>
            <Row>
              <Col md="6">
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
              <Col md="6">
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
              <Col lg="10" lg-offset="1">
                <h2 className="home__section_title mui--text-display2 mui--text-center">
                  Features
                </h2>
                <Row className="home__features_row">
                  <Col md="7">
                    <img
                      src="https://cdn.gobackbone.com/assets/shoulder-strap.jpg"
                      alt="Front shoulder view of the Backbone brace"
                    />
                  </Col>
                  <Col md="5" className="home__features_text-container">
                    <Panel className="home__features_card">
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
                <Row className="home__features_row">
                  <Col md="5" className="home__features_text-container">
                    <Panel className="home__features_card">
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
                      src="https://cdn.gobackbone.com/assets/module-floating-angled.jpg"
                      alt="Backbone sensor module"
                    />
                  </Col>
                </Row>
                <Row className="home__features_row">
                  <Col md="7">
                    <img
                      src="https://cdn.gobackbone.com/assets/app-screens-final.jpg"
                      alt="Backbone app screenshots"
                    />
                  </Col>
                  <Col md="5" className="home__features_text-container">
                    <Panel className="home__features_card">
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
          <Container fluid>
            <h1 className="mui--text-center">What Our Customers are Saying</h1>
            <Row>
              <Col md="12" lg="4" className="testimonials-container">
                <Panel>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    Overall I do feel better at the end of the day with the support and posture
                    reminders. Good job Backbone team.
                    <span>- Ryan H</span>
                  </p>
                </Panel>
              </Col>
              <Col md="12" lg="4" className="testimonials-container">
                <Panel>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    I’ve had no issues with it so far. I really like it, and I hope these guys
                    stick with it, because it seems like a lot of additional useful functionality
                    could be added to the app in the future.
                    <span>- BH</span>
                  </p>
                </Panel>
              </Col>
              <Col md="12" lg="4" className="testimonials-container">
                <Panel>
                  <p>
                    <i className="fa fa-quote-left" aria-hidden="true" />
                    Got mine yesterday. After a quick update, the Backbone worked as advertised. If
                    you truly have back issues, I highly recommend you keep your pledge.
                    <span>- Tom M</span>
                  </p>
                </Panel>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="home__section home__videos">
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
        <section className="home__section home__contact" id="home__contact">
          <Container className="mui--text-center">
            <h1>Contact Us</h1>
            <p>Leave us any feedback or questions below.</p>
            <form onSubmit={this.handleOnSubmit}>
              <Row>
                <Col md="6">
                  <input
                    className={
                      !this.state.name && this.state.formError
                        ? 'required-field'
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
                        ? 'required-field'
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
                          ? 'required-field'
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
                        ? 'required-field'
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

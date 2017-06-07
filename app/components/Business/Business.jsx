import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Button from 'muicss/lib/react/button';

import './Business.scss';

class Business extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      company: '',
      phoneNum: '',
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
    const { email, name, company, message, phoneNum } = this.state;

    // Check that it's not an empty form
    if (!email || !name || !company || !message || !phoneNum) {
      return this.setState({
        formError: 'The highlighted fields are required',
      });
    }

    return post('/mail/business', {
      email,
      name,
      company,
      message,
      phoneNum,
    })
      .then(() => {
        // clear form and set confirm message
        this.setState({
          name: '',
          email: '',
          phoneNum: '',
          company: '',
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
      <div className="business">
        <section className="business__section business__contact home__contact">
          <Container className="mui--text-center">
            <div className="business__section_title">
              <h2 className="responsive-text-display1">
                Try out <span className="primary-color">Backbone</span> for your company today
              </h2>
              <h2 className="responsive-text-title">
                Pay if you like it, free if you don’t. Let’s talk.
              </h2>
            </div>
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
                    className={
                      !this.state.company && this.state.formError
                        ? 'required-field'
                        : null
                    }
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="6">
                  <input
                    className={
                      !this.state.phoneNum && this.state.formError
                        ? 'required-field'
                        : null
                    }
                    type="text"
                    placeholder="Phone number"
                    name="phoneNum"
                    value={this.state.phoneNum}
                    onChange={this.handleOnChange}
                  />
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
        <section className="business__section business__benefits mui--text-center">
          <Container>
            <h2 className="business__section_title responsive-text-display1">
              The possible benefits of using Backbone for your business
            </h2>
            <Row>
              <Col md="4">
                <i className="material-icons">attach_money</i>
                <p>
                  Save millions of dollars per year on healthcare spending and worker injury claims
                </p>
              </Col>
              <Col md="4">
                <i className="material-icons">people</i>
                <p>
                  Improve employee productivity and decrease number of lost work days
                </p>
              </Col>
              <Col md="4">
                <i className="material-icons">event_note</i>
                <p>
                  Boost employee morale and satisfaction, and reduce employee turnover
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default Business;

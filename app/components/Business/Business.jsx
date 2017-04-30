import React, { Component } from 'react';
import autobind from 'autobind-decorator';
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
      number: '',
      message: '',
    };
  }

  @autobind handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="business">
        <section className="business__contact home__contact">
          <Container className="mui--text-center">
            <h1>
              Try out <span>Backbone</span> for your company today.
              <br />
              Pay if you like it, free if you don’t. Let’s talk.
            </h1>
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
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.handleOnChange}
                  />
                </Col>
                <Col md="6">
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleOnChange}
                  />
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
        <section className="business__benefits ">
          <Container className="backbone-benefits">
            <h1>The possible benefits of using Backbone for your business</h1>
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

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Form from '../common/Form/Form';

import './Signup.scss';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      login: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnLoginChange = this.handleOnLoginChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleOnLoginChange() {
    this.setState({ login: !this.state.login });
  }

  renderForm() {
    if (this.state.login) {
      return (
        <Form
          key={2}
          login
          toggleSignup={this.handleOnLoginChange}
          onChange={this.handleOnChange}
        />
      );
    }

    return (
      <Form
        key={1}
        signup
        toggleSignup={this.handleOnLoginChange}
        onChange={this.handleOnChange}
      />
    );
  }

  render() {
    return (
      <div className="signup-container">
        <ReactCSSTransitionGroup
          transitionName="signup"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.renderForm()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Signup;

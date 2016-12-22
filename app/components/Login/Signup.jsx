import React, { Component } from 'react';
import Form from '../common/Form/Form';

import './Login.scss';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="login-container">
        <Form
          signup
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default Signup;

import React, { Component } from 'react';
import Form from '../common/Form/Form';

import './Login.scss';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
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
          login
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default Login;

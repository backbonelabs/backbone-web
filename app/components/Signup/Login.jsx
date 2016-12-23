import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import Logo from '../../public/images/Logo.png';
import Form from '../common/Form/Form';

import './Signup.scss';

class Signup extends Component {
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
      <div className="signup-container">
        <Form>
          <div className="signup-logo-container">
            <img src={Logo} role="presentation" />
          </div>
          <div className="signup-header">
            <h2>Login</h2>
          </div>
          <div className="signup-textfield-container">
            <TextField
              className="signup-textfield"
              floatingLabelFocusStyle={{ color: red500 }}
              underlineFocusStyle={{ borderColor: red500 }}
              floatingLabelText="Email"
              name="email"
              onChange={this.handleOnChange}
            />
            <TextField
              className="signup-textfield"
              floatingLabelFocusStyle={{ color: red500 }}
              underlineFocusStyle={{ borderColor: red500 }}
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.handleOnChange}
            />
            <RaisedButton
              label="Login"
              className="signup-btn"
              backgroundColor={red500}
              labelColor="#FFF"
              type="submit"
            />
            <div>
              <p>Don't have an account?
                <Link to="/signup" className="signup-link"> Sign Up</Link>
              </p>
              <Link to="password-reset" className="forgot-password">
                <p><small>Forgot Your Password?</small></p>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default Signup;


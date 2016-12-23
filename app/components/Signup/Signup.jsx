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
      confirmPassword: '',
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
            <h2>Sign Up</h2>
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
            <TextField
              className="signup-textfield"
              floatingLabelFocusStyle={{ color: red500 }}
              underlineFocusStyle={{ borderColor: red500 }}
              floatingLabelText="Confirm Password"
              type="password"
              name="confirmPassword"
              onChange={this.handleOnChange}
            />
            <RaisedButton
              label="Sign up"
              className="signup-btn"
              backgroundColor={red500}
              labelColor="#FFF"
              type="submit"
            />
            <p>Already signed up?
              <Link to="/login" className="signup-link"> Log In</Link>
            </p>
          </div>
        </Form>
      </div>
    );
  }
}

export default Signup;


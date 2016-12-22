import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import logo from '../../../public/images/Logo.png';
import './Form.scss';

const materialPrimaryColor = '#F44336';

const Form = props => (
  <div className="Form-container">
    <Paper className="Form-form" zDepth={1}>
      <div className="logo-container">
        <img src={logo} role="presentation" className="Form-logo" />
      </div>
      <div className="Form-header">
        <h2 style={{ textAlign: 'center' }}>{props.login ? 'Login' : 'Sign Up'}</h2>
      </div>
      <div className="Form-textfield-container">
        <TextField
          className="Form-textfield"
          floatingLabelFocusStyle={{ color: materialPrimaryColor }}
          underlineFocusStyle={{ borderColor: materialPrimaryColor }}
          floatingLabelText="Email"
        />
        <TextField
          className="Form-textfield"
          floatingLabelFocusStyle={{ color: materialPrimaryColor }}
          underlineFocusStyle={{ borderColor: materialPrimaryColor }}
          floatingLabelText="Password"
          type="password"
        />
        {
          props.signup ?
            <TextField
              className="Form-textfield"
              floatingLabelFocusStyle={{ color: materialPrimaryColor }}
              underlineFocusStyle={{ borderColor: materialPrimaryColor }}
              floatingLabelText="Confirm Password"
              type="password"
            /> : null
        }
        <RaisedButton
          label={props.login ? 'Login' : 'Sign up'}
          className="FormBtn"
          backgroundColor={materialPrimaryColor}
          labelColor="#FFF"
        />
        {
          props.login ?
            <p>Don't have an account?
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <span style={{ color: materialPrimaryColor }}> Sign up</span>
              </Link>
            </p>
          : null
        }
      </div>
    </Paper>
  </div>
);

Form.propTypes = {
  login: PropTypes.bool,
  signup: PropTypes.bool,
};

export default Form;

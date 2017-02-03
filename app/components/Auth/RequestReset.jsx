import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import Logo from '../../images/logo.png';
import constants from '../../utils/constants';
import * as authActions from '../../actions/auth';
import SuccessMessage from './SuccessMessage';

import './auth.scss';

class RequestReset extends Component {
  static propTypes = {
    requestReset: PropTypes.func,
    auth: PropTypes.shape({
      inProgress: PropTypes.bool,
      requestResetError: PropTypes.object,
      requestSent: PropTypes.bool,
    }),
  }

  constructor() {
    super();

    this.state = {
      email: '',
      validEmail: false,
    };
  }

  @autobind
  handleOnChange(evt) {
    const stateChanges = {
      validEmail: constants.emailRegex.test(evt.target.value.trim()),
      email: evt.target.value,
    };
    this.setState(stateChanges);
  }

  @autobind
  handleOnSubmit(evt) {
    evt.preventDefault();
    const { email } = this.state;
    this.props.requestReset({ email: email.trim() });
  }

  render() {
    return (
      <Container className="auth-container">
        {
         this.props.auth.requestSent ?
           <SuccessMessage
             message="Instructions on how to reset your password have been emailed to you."
           />
          :
           <Panel className="auth-container__panel">
             <div className="auth-container__header">
               <h1>Forgot your password?</h1>
               <div className="auth-container__logo">
                 <img src={Logo} role="presentation" />
               </div>
             </div>
             <Form className="auth-container__form" onSubmit={this.handleOnSubmit}>
               <h4>
                Enter your email address below to receive instructions
                on how to change your password.
              </h4>
               <div className="auth-container__input">
                 <Input
                   label="Email"
                   floatingLabel
                   value={this.state.email}
                   onChange={this.handleOnChange}
                 />
               </div>
               <div className="auth-container__cta">
                 { this.props.auth.inProgress ?
                   <MDSpinner singleColor="#F44336" /> :
                   <Button
                     variant="raised"
                     color="danger"
                     type="submit"
                     disabled={!this.state.email || !this.state.validEmail}
                   >
                      Submit
                    </Button>
                  }
               </div>
             </Form>
           </Panel>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, authActions)(RequestReset);

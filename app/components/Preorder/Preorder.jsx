import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import appStoreBadge from '../../images/app-store-badge.svg';
import playStoreBadge from '../../images/play-store-badge.svg';
import logo from '../../images/logo.png';
import './Preorder.scss';

class Preorder extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      success: '',
      error: '',
    };
  }

  @autobind handleOnEmailChange(evt) {
    this.setState({ email: evt.target.value });
  }

  @autobind handleOnSubmit(evt) {
    evt.preventDefault();
    const { email } = this.state;

    if (email) {
      post('/mail/mailing-list', { email })
        .then((res) => {
          this.setState({ success: res.data.success, error: '' });
        })
        .catch((err) => {
          this.setState({
            error: (err.response &&
              err.response.data &&
              err.response.data.error) ||
              err.message,
            success: '',
          });
        });
    }
  }

  render() {
    const { error, success } = this.state;
    return (
      <div>
        <div className="preorder__bg-image">
          <div className="preorder__form-container">
            <div className="preorder__form-container-header">
              <img
                className="preorder__logo"
                src={logo}
                alt="Man wearing a Backbone"
              />
              <div>
                <a href="https://itunes.apple.com/us/app/backbone-smart-posture/id1184998773">
                  <img
                    className="preorder__app-badge"
                    alt="Download from the App Store"
                    src={appStoreBadge}
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=co.backbonelabs.backbone">
                  <img
                    className="preorder__app-badge"
                    alt="Download from Google Play"
                    src={playStoreBadge}
                  />
                </a>
              </div>
              <h2>
                Enter your email to be notified when Backbone is available for purchase!
              </h2>
            </div>
            {success
              ? <h2>{success}</h2>
              : <form
                className="preorder__form-container-form"
                onSubmit={this.handleOnSubmit}
              >
                <input
                  value={this.state.email}
                  onChange={this.handleOnEmailChange}
                  className="preorder__form-container-input"
                  type="email"
                  name="email"
                  placeholder="Email address"
                />
                <button
                  className="preorder__form-container-btn"
                  type="submit"
                >
                    Sign up
                  </button>
              </form>}
            {error ? <p className="preorder__error">{error}</p> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Preorder;

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import appStoreBadge from '../../images/app-store-badge.svg';
import playStoreBadge from '../../images/play-store-badge.svg';
import logo from '../../images/logo.png';
import './Home.scss';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      success: '',
      error: '',
    };
  }

  @autobind
  handleOnEmailChange(evt) {
    this.setState({ email: evt.target.value });
  }

  @autobind
  handleOnSubmit(evt) {
    evt.preventDefault();
    const { email } = this.state;

    if (email) {
      post('/mailing-list', { email })
        .then((res) => {
          this.setState({ success: res.data.success, error: '' });
        })
        .catch((err) => {
          this.setState({ error: err.response.data.error, success: '' });
        });
    }
  }

  render() {
    const { error, success } = this.state;
    return (
      <div>
        <div className="home__bg-image" />
        <div className="home__form-container">
          <div className="home__form-container-header">
            <img className="home__logo" src={logo} alt="Man wearing a Backbone" />
            <div>
              <a
                href="https://itunes.apple.com/us/app/backbone-smart-posture/id1184998773"
              >
                <img
                  className="home__app-badge"
                  alt="Download from the App Store"
                  src={appStoreBadge}
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=co.backbonelabs.backbone&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" // eslint-disable-line max-len
              >
                <img
                  className="home__app-badge"
                  alt="Download from Google Play"
                  src={playStoreBadge}
                />
              </a>
            </div>
            <h2>Enter your email to be notified when Backbone is available for purchase!</h2>
          </div>
          { success ?
            <h2>{success}</h2>
            :
            <form className="home__form-container-form" onSubmit={this.handleOnSubmit}>
              <input
                value={this.state.email}
                onChange={this.handleOnEmailChange}
                className="home__form-container-input"
                type="email" name="email" placeholder="Email address"
              />
              <button className="home__form-container-btn" type="submit">Sign up</button>
            </form>
          }
          { error ? <p className="home__error">{error}</p> : null }
        </div>
      </div>
    );
  }
}

export default Home;

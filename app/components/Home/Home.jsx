import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { post } from 'axios';
import logo from '../../public/images/logo.png';
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
          throw new Error(err.response.data.error || err.message);
        });
    }
  }

  render() {
    const { error, success } = this.state;
    return (
      <div>
        <div className="home__bg-image" />
        <div className="home__form-container">
          <div className="home__form-container__header">
            <img src={logo} alt="Man wearing a backbone" />
            <h2>Enter your email and be notified when Backbone is available for purchase!</h2>
          </div>
          { success ?
            <h1>{success}</h1>
            :
            <form className="home__form-container__form" onSubmit={this.handleOnSubmit}>
              <input
                value={this.state.email}
                onChange={this.handleOnEmailChange}
                className="home__form-container__input"
                type="email" name="email" placeholder="Email address"
              />
              <button className="home__form-container__btn" type="submit">Sign up</button>
            </form>
          }
          { error ? <p className="home__error">{error}</p> : null }
        </div>
      </div>
    );
  }
}

export default Home;

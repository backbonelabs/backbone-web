import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    static propTypes = {
      isAuthenticated: PropTypes.func.isRequired,
    }

    componentWillMount() {
      const token = localStorage.getItem('jwt');

      if (token) {
        this.props.isAuthenticated(token);
      } else {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }


  const mapStateToProps = state => ({
    auth: state.auth,
  });

  return connect(mapStateToProps, actions)(Authentication);
}

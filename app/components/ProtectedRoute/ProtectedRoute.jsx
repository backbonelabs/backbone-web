import React, { Component, PropTypes } from 'react';

class ProtectedRoute extends Component {
  static propTypes = {
    userActions: PropTypes.shape({
      fetchUser: PropTypes.func,
    }),
  }

  componentWillMount() {
    this.props.userActions.fetchUser();
  }

  render() {
    return (
      <div>
        <h1>PROTECTED ROUTE</h1>
      </div>
    );
  }
}

export default ProtectedRoute;

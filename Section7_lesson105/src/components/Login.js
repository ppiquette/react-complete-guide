import React, { Component } from 'react';
import { AuthContext } from '../auth-context';

class Login extends Component {

  // new from REACT 16.6
  static contextType = AuthContext

  render () {
    return (
      <button onClick={this.context.toggleAuth}>
        {this.context.isAuth ? 'Logout' : 'Login'}
      </button>
    )
  }
}

export default Login;

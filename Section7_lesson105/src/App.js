import React, { Component } from 'react';
import { AuthContext } from './auth-context'
import Login from './components/Login';
import Profile from './components/Profile';


class App extends Component {
  state = {
    isAuth: false
  };

  toggleAuth = () => {
    this.setState(prevState => {
      return {
        isAuth: !prevState.isAuth
      };
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{ isAuth: this.state.isAuth, toggleAuth: this.toggleAuth }}
      >
        <Login />
        <Profile />
      </AuthContext.Provider>
    );
  }
}

export default App;

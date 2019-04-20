import React, { Component } from 'react';
import AuthForm from './AuthForm';

class Auth extends Component {

    submit = (values) => {
        console.log(values)
    }

    render() {
        return (
          <AuthForm onSubmit={this.submit} />
        )
    }
}

export default Auth;
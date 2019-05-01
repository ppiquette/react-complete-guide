import React, { Component } from 'react';
import { connect } from 'react-redux'
import AuthForm from './AuthForm';
import { auth } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom'
import Button from '../UI/Button';
import Spinner from '../UI/Spinner'

const classes = {
    center: {
        margin: "auto",
        width: "150px",
        padding: "3px",
        alignItem: "center",

    },
}

class Auth extends Component {

    state = {
        signup: false,
    } 

    submit = (values) => {
        console.log(values);
        this.props.onAuth(values.email, values.password, this.state.signup);
    }

    onSwitch = () => {
        let signup = this.state.signup;
        this.setState( {
            ...this.state,
            signup: !signup,
        }) 
    }

    render() {

        return (
            <>
                <AuthForm onSubmit={this.submit} />
                <div style={classes.center}>
                    <Button 
                        onClick={this.onSwitch} 
                        buttonType="Danger">
                        
                        Here to { this.state.signup ? "sign-in" : "sign-up" }
                    </Button>
                </div>
                {this.props.auth && (<p style={classes.center}>{this.props.auth.error}</p>)}
                {this.props.auth && (this.props.auth.loading ? <Spinner /> : null)}
            </>          
        )
    }
}

// When receiving a new state
const mapStateToProps = (state) => {
    return {
        auth: state.app.auth,
    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (login, password, signup) => {dispatch(auth(login, password, signup))}
    }
}

// Need to wrap withRouter around redux (i.e. connect) otherwise get a warning
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
 )(Auth))
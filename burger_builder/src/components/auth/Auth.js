import React, { Component } from 'react';
import Input from '../UI/Input'
import Button from '../UI/Button'
import {capFirstLetter} from '../../util/capFirstLetter'
import cssClasses from './Auth.module.css'

class Auth extends Component {
    state = {
        controls:{
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                touched: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                value: ''
            },
            password: {
                elementtype: 'input',
                elementconfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                value: ''
            },
        }
    }

    // Copy of ContactData.js, really should use premade Form library.
    checkValidity = (value, rules) => {
        let isInvalid = false;

        if (rules){
            // Check if non empty entry (spaces are trimmed)
            if(rules.required) {
                isInvalid = isInvalid || (value.trim() === "")
            }

            if(rules.minLength) {
                isInvalid = isInvalid || (value.length <= rules.minLength)
            }

            // add as many rules as necessery
        }

        return !isInvalid
    }

    // Copy of ContactData.js, really should use premade Form library.
    onChangeValueHandler = (event, key) => {
        const updatedControls = {
            ...this.state.controls,
            [key]: {
                ...this.state.controls[key],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[key].validation),
                touch: true,
            }
        }
        this.setState({controls: updatedControls})
    }

    // Copy of ContactData.js, really should use premade Form library.
    checkIfFormValid = () => {
        let invalid = false;
        for(const value of Object.values(this.state.controls)){
            invalid = invalid || !value.valid
        }
        return !invalid
    }

    render() {
        // Copy of ContactData.js, really should use premade Form library.
        let inputDisplay = []
        const entries = Object.entries(this.state.controls);
        for(const [key, value] of entries){
            inputDisplay.push(
                <Input 
                    key={key}
                    label={capFirstLetter(key)}
                    elementtype={value.elementtype} 
                    elementconfig={value.elementconfig} 
                    value={value.value}
                    touched={value.touched}
                    invalid={!value.valid}
                    onChange={(event) => this.onChangeValueHandler(event, key)} />
            )
        }

        return (
            <div className={cssClasses.Auth}>
                <form onSubmit={this.onSubmitHandler}>
                    {inputDisplay}
                    <Button buttonType='Success'>Submit</Button>
                    {/* <Button disabled={!this.checkIfFormValid()} buttonType='Success'>Submit</Button> */}
                </form>
            </div>
        );
    }
}

export default Auth;
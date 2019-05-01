import React, { Component } from 'react';
import Button from '../UI/Button';
import cssClasses from './ContactData.module.css'
import withErrorHandler from '../../hoc/withErrorHandler';
import Axios from '../../axios-orders';
import Spinner from '../UI/Spinner';
import {withRouter} from 'react-router-dom'
import Input from '../UI/Input'
import {capFirstLetter} from '../../util/capFirstLetter'
import { connect } from 'react-redux';
import axiosInstance from '../../axios-orders';


class ContactData extends Component {
    state = {
        burgers: null,
        summittingPurchase: false,
        orderForm: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                touched: false,
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                touched: false,
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            street:  {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                touched: false,
                validation: {
                    required: true,
                lalid: false,
                },
                valid: false,
                value: ''
            },
            code:  {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                value: ''
            },
            deliveryMethod:  {
                elementtype: 'select',
                touched: true,
                elementconfig: {
                    options: [
                        {value: 'fastest',  displayValue: 'Fastest'},
                        {value: 'cheapest',  displayValue: 'Cheapest'}
                    ]
                },
                valid: true,
                value: 'fastest'
            }
        }
    }

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


    componentDidMount(){
        this.setState({burgers: this.props.location.burgers})
    }

    onSubmitHandler = (event) => {
        // Prevent send the request and reloading the page 
        event.preventDefault()

        this.setState({summittingPurchase: true});
        
        let order = {
            burgers: this.state.burgers,
            customer: []
        }

        let customer = {}
        const formEntries = Object.entries(this.state.orderForm)
        for(const [key, value] of formEntries){
            if (value.value !== ''){
                // The following both are equivalent
                // customer = {...customer, [key]: value.value}
                customer[key] = value.value
            }
        }
        order.customer = customer
        
        // .json is because we use Google Firebase
        Axios.post('/orders.json?auth=' + this.props.token, order)
            .then(response => {
                this.setState({summittingPurchase: false});
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({summittingPurchase: false});  
            });
    }

    onChangeValueHandler = (event, key) => {
        // The following is done to create a new element that does refer to the original 
        // state. The ... operator doesn't deep copy the object, it only copies the first level.
        const currentOrderForm = {...this.state.orderForm}
        const currentOrderFormKeyElement = {...currentOrderForm[key]}
        
        currentOrderFormKeyElement.value = event.target.value
        currentOrderFormKeyElement.valid = this.checkValidity(event.target.value, currentOrderFormKeyElement.validation)
        currentOrderFormKeyElement.touched = true

        currentOrderForm[key] = currentOrderFormKeyElement
        this.setState({orderForm: currentOrderForm})
    }

    checkIfFormValid = () => {
        let invalid = false;
        for(const value of Object.values(this.state.orderForm)){
            invalid = invalid || !value.valid
        }
        return !invalid
    }

    render() {
        let spinner = null;
        if(this.state.summittingPurchase){
            spinner = <Spinner />
        }

        let inputDisplay = []
        const entries = Object.entries(this.state.orderForm);
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
            <div className={cssClasses.ContactData}>

                <h4>Enter your contact data</h4>
                <form onSubmit={this.onSubmitHandler}>
                    {inputDisplay}
                    <Button disabled={!this.checkIfFormValid()} buttonType='Success'>Submit</Button>
                </form>

                {spinner}
            </div>
        );
    }
}

// When receiving a new state
const mapStateToProps = (state) => {
    return {
        token: state.app.auth.token,
    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
 )(withErrorHandler(ContactData, axiosInstance)))

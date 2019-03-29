import React, { Component } from 'react';
import Button from '../UI/Button';
import cssClasses from './ContactData.module.css'
import withErrorHandler from '../../hoc/withErrorHandler';
import Axios from '../../axios-orders';
import Spinner from '../UI/Spinner';
import {withRouter} from 'react-router-dom'
import Input from '../UI/Input'


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
                validation: {
                    required: true,
                },
                valid: false,
                value: ''
            },
            deliveryMethod:  {
                elementtype: 'select',
                elementconfig: {
                    options: [
                        {value: 'fastest',  displayValue: 'Fastest'},
                        {value: 'cheapest',  displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        }
    }

    checkValidity = (value, rules) => {
        let isInvalid = false;

        // Check if non empty entry (spaces are trimmed)
        if(rules.required) {
            isInvalid = isInvalid || (value.trim() !== "")
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
        Axios.post('/orders.json', order)
            .then(response => {
                this.setState({summittingPurchase: false});
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({summittingPurchase: false});  
            });
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onChangeValueHandler = (event, key) => {
        // The following is done to create a new element that does refer to the original 
        // state. The ... operator doesn't deep copy the object, it only copies the first level.
        const currentOrderForm = {...this.state.orderForm}
        const currentOrderFormKeyElement = {...currentOrderForm[key]}
        
        currentOrderFormKeyElement.value = event.target.value
        currentOrderFormKeyElement.valid = this.checkValidity(event.target.value, currentOrderFormKeyElement.validation)

        console.log(currentOrderFormKeyElement.valid)

        currentOrderForm[key] = currentOrderFormKeyElement
        this.setState({orderForm: currentOrderForm})
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
                    label={this.capitalizeFirstLetter(key)}
                    elementtype={value.elementtype} 
                    elementconfig={value.elementconfig} 
                    value={value.value}
                    // valid={value.valid}
                    onChange={(event) => this.onChangeValueHandler(event, key)} />
            )
        }

        return (
            <div className={cssClasses.ContactData}>

                <h4>Enter your contact data</h4>
                <form onSubmit={this.onSubmitHandler}>
                    {inputDisplay}
                    <Button buttonType='Success' >SubmitBazouelle</Button>
                </form>

                {spinner}
            </div>
        );
    }
}

export default withErrorHandler(withRouter(ContactData), Axios);
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.module.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'


class ContactData extends Component {
    state = {
        burgers: null,
        summittingPurchase: false,
        name: '',
        email: '',
        address: {
            street: '',
            code: ''
        }
    }

    componentDidMount(){
        this.setState({burgers: this.props.location.burgers})
    }

    onSubmitHandler = (event) => {
        // Prevent send the request and reloading the page 
        event.preventDefault()

        this.setState({summittingPurchase: true});
        const order = {
            burgers: this.state.burgers,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.address.street,  
                    code: this.state.address.code
                },
                email: this.state.email
            },
            deliveryMethod: 'asap'
        }
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

    render() {

        let spinner = null;
        if(this.state.summittingPurchase){
            spinner = <Spinner />
        }

        return (
            <div className={cssClasses.ContactData}>

                <h4>Enter your contact data</h4>
                <form onSubmit={this.onSubmitHandler}>
                    <Input inputtype="input" type='text' name='name' placeholder='You Name' onChange={(event) => this.setState({name: event.target.value})} />
                    <Input inputtype="input" type='email' name='email' placeholder='Your email' onChange={(event) => this.setState({email: event.target.value})}/>
                    <Input inputtype="input" type='text' name='street' placeholder='Delivery Street' onChange={(event) => this.setState({address: {street: event.target.value, code: this.state.address.code}})} />
                    <Input inputtype="input" type='text' name='postal' placeholder='Delivery Postal Code' onChange={(event) => this.setState({address: {street: this.state.address.street, code: event.target.value}})} />
                    <Button buttonType='Success' >Submit</Button>
                </form>

                {spinner}
            </div>
        );
    }
}

export default withErrorHandler(withRouter(ContactData), Axios);
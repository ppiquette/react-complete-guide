import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    
    // The whole class assume that multiple burger can be added but for now I 
    // don't save the burger after unmounting so there is only one burger each time.
    // I could use Firebase to save the current status of the order... eventually

    state = {
        summittingPurchase: false,
        burgers: []
    }

    uniqueID = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    componentDidMount(){
        if(this.props.location.state){
            let listOfBurgers = this.state.burgers;
            let newBurger = {...this.props.location.state, uniqueID: this.uniqueID()}
            listOfBurgers.push(newBurger)
            this.setState({burgers: listOfBurgers})
        }
    }

    checkoutClicked = () => {
        console.log(this.props.match.path)
        this.props.history.push(this.props.match.path + '/contactdata')
    }

    render() {
        let spinner = null;
        if (this.state.summittingPurchase){
            spinner = (
                <Spinner/>
            )
        }

        let summary = <p> no burger yet</p>
        if(this.state.burgers.length > 0){
            summary = (
                this.state.burgers.map((burger) => { return (
                    <CheckoutSummary
                        key = {burger.uniqueID}
                        ingredients = {burger.ingredients}
                        checkout = {this.checkoutClicked}
                        returnToBuilder = {() => {this.props.history.replace('/')}}
                    />
                )} )
            )
        }

        return (
            <>
                {summary}
                {spinner}
                {/* Passing the ingredients using "render" instead of "component" */}
                <Route path={this.props.match.path + '/contactdata'} render={() => (<ContactData burgers={this.state.burgers}/>)} />
            </>
        );
    }
}

export default Checkout;
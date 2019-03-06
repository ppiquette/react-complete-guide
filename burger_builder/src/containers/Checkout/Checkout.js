import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import uID from '../../util/uniqueID'

class Checkout extends Component {
    
    // The whole class assume that multiple burger can be added but for now I 
    // don't save the burger after unmounting so there is only one burger each time.
    // I could use Firebase to save the current status of the order... eventually

    state = {
        summittingPurchase: false,
        burgers: []
    }

    componentDidMount(){
        if(this.props.location.state){
            let listOfBurgers = this.state.burgers;
            let newBurger = {...this.props.location.state, uniqueID: uID}
            listOfBurgers.push(newBurger)
            this.setState({burgers: listOfBurgers})
        }
    }

    checkoutClicked = () => {
        this.props.history.push({
            pathname: this.props.match.path + '/contactdata',
            state:{
                burgers: this.state.burgers
            }
        });
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
                <Route path={this.props.match.path + '/contactdata'} component={ContactData} />
            </>
        );
    }
}

export default Checkout;
import React, { Component } from 'react';
import CheckoutSummary from './CheckoutSummary';
import Spinner from '../UI/Spinner';
import {Route} from 'react-router-dom'
import ContactData from './ContactData';
import {uniqueID} from '../../util/uniqueID'

class Checkout extends Component {
    
    // The whole class assume that multiple burger can be added but for now I 
    // don't save the burger after unmounting so there is only one burger each time.
    // I could use Firebase to save the current status of the order... eventually

    state = {
        summittingPurchase: false,
        burgers: []
    }

    componentDidMount(){
        console.log(this.props.location)
        if(this.props.location.newburger){
            let listOfBurgers = this.state.burgers;
            let newBurger = {...this.props.location.newburger, uniqueID: uniqueID()}
            listOfBurgers.push(newBurger)
            this.setState({burgers: listOfBurgers})
        }
        // if no new burger, return to '/'
        else {
            this.props.history.push({
                pathname: '/'
            })
        }
    }

    checkoutClicked = () => {
        this.props.history.push({
            pathname: this.props.match.path + '/contactdata',
            burgers: this.state.burgers
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
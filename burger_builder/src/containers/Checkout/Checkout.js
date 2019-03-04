import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    
    state = {
        burgers: null
    }
    
    render() {
        let display = <p> no burger yet</p>
        if(this.state.burgers !== null){
            display = (
                <div>
                    <CheckoutSummary
                        ingredients = {this.props.ingredients}
                        checkout = {this.props.checkout}
                        returnToBuilder = {this.props.returnToBuilder}
                    />
                </div>
            )
        }

        return (
            [display]
        );
    }
}

export default Checkout;
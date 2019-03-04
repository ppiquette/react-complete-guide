import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients = {this.props.ingredients}
                    checkout = {this.props.checkout}
                    returnToBuilder = {this.props.returnToBuilder}
                />
            </div>
        );
    }
}

export default Checkout;
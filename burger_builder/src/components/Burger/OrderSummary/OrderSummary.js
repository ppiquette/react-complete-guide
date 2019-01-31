import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((key) => {
            return(
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>)
        })
        
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>

                <p>Continue to checkout?</p>
                <Button 
                    buttonType='Danger'
                    onClick={this.props.cancelPurchase}
                >CANCEL</Button>
                <Button 
                    buttonType='Success'
                    onClick={this.props.continuePurchase}
                >CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;
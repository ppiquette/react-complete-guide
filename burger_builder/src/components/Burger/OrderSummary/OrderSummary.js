import React from 'react';
import Aux from '../../../hoc/Aux'

const OrderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients).map((key) => {
        return(
            <li key={key}>
                <span style={{testTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>)
    })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
};

export default OrderSummary;
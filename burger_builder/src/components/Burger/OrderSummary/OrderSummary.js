import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients).map((key) => {
        return(
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>)
    })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>

            <p>Continue to checkout?</p>
            <Button 
                buttonType='Danger'
                onClick={props.cancelPurchase}
            >CANCEL</Button>
            <Button 
                buttonType='Success'
                onClick={props.continuePurchase}
            >CONTINUE</Button>
        </Aux>
    );
};

export default OrderSummary;
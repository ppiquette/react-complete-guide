import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';
import cssClasses from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={cssClasses.CheckoutSummary}>
            <h2>Your Order</h2>
            <div style = {{width: '100%', margin: 'auto' }}>
                <Burger
                    ingredients = {props.ingredients}
                />
            </div>

            <Button 
                onClick={props.returnToBuilder} 
                buttonType="Danger">Later</Button>
            <Button 
                onClick={props.checkout} 
                buttonType="Success">Checkout</Button>
        </div>
    );
};

export default CheckoutSummary;
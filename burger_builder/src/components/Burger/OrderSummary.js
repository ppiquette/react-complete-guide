import React from 'react';
import Aux from '../../hoc/Aux'
import Button from '../UI/Button';
import { connect } from 'react-redux';

const OrderSummary = (Props) => {
    const ingredientSummary = Object.keys(Props.ingredients).map((key) => {
        return(
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {Props.ingredients[key]}
            </li>)
    })
    
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{Props.price.toFixed(2)}</strong></p>

            <p>Continue to checkout?</p>
            <Button 
                buttonType='Danger'
                onClick={Props.cancelPurchase}
            >CANCEL</Button>
            <Button 
                buttonType='Success'
                onClick={Props.continuePurchase}
            >CONTINUE</Button>
        </Aux>
    )
};

// When receiving a new state
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(OrderSummary)

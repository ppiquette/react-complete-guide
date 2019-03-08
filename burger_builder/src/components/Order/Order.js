import React from 'react';
import cssClasses from './Order.module.css'

const Order = (props) => {
    let burgers = props.item.burgers

    let burgers_display = burgers.map((burger, index) => {
        
        let ingredients = []
        for(let key in burger.ingredients) {
            ingredients.push(<span className={cssClasses.Ingredient}>{key}: {burger.ingredients[key]}</span>)
        }

        return(
            <>
                <p>Burger #{index+1}</p>
                {ingredients}
            </>
            )
        })
    
    let name = null
    if(props.item.customer.name) {
        name = <p>{props.item.customer.name}</p>
    }

    let email = null
    if(props.item.customer.email) {
        email = <p>{props.item.customer.email}</p>
    }

    return (
        <div className={cssClasses.Order}>
            {name}
            {email}
            {burgers_display}
        </div>
    );
};

export default Order;
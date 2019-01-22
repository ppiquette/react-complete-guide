import React from 'react'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    return (
        props.layers.map((type) => {
            return (
                <BurgerIngredient
                    type={type} 
                />
            )
        })
    )
}

export default burger
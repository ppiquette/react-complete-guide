import React from 'react'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import cssClasses from './Burger.module.css'

const burger = (props) => {

    // Get an array of all the keys from our props
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientkey => {
            // Create a number of empty element in an array then run again map to set the content
            // equal to the <BurgerIngredient ...> line
            return [...Array(props.ingredients[ingredientkey])].map((_, index) => { 
                        return (
                            <BurgerIngredient key={ingredientkey+index} type={ingredientkey}/>
                        )
            })
        })
        .reduce((previousVal, currentVal) => {
            return previousVal.concat(currentVal);
        }, [])

        return (
            <div className={cssClasses.Burger}>
                <BurgerIngredient type='bread-top'/>
                {transformedIngredients.length > 0 ? transformedIngredients : "Select some ingredients"}
                <BurgerIngredient type='bread-bottom'/>
            </div>
        )
}

export default burger
import React from 'react'
import BurgerIngredient from "./BurgerIngredient";
import cssClasses from './Burger.module.css'

const burger = (props) => {

    // Get an array of all the keys from our props
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientkey => {
            // Go through all types of ingredients (first map) than create an Array of the size of 
            // the number of each ingredient filled with  the <BurgerIngredient ...> (second map)
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
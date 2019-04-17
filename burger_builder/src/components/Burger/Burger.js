import React from 'react'
import BurgerIngredient from "./BurgerIngredient";
import cssClasses from './Burger.module.css'
import { connect } from 'react-redux'


const Burger = (Props) => {

    // Get an array of all the keys from our props
    const transformedIngredients = Object.keys(Props.ingredients)
        .map(ingredientkey => {
            // Go through all types of ingredients (first map) than create an Array of the size of 
            // the number of each ingredient filled with  the <BurgerIngredient ...> (second map)
            return [...Array(Props.ingredients[ingredientkey])].map((_, index) => { 
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
 )(Burger)

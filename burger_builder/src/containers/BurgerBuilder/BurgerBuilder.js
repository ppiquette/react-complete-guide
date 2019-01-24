import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


const INGREDIENTS_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese:0,
            meat: 0
        },
        totalPrice: 4.0
    }

    ingredientChange = (type, amount) => {
        let ingredientsCopy = {...this.state.ingredients};
        ingredientsCopy[type] += amount;
         
        let totalPriceCopy = this.state.totalPrice;
        totalPriceCopy += amount * INGREDIENTS_PRICE[type]

        this.setState({ingredients: ingredientsCopy, totalPrice: totalPriceCopy});
    }
 
    addIngredientHandler = (type) => {
        this.ingredientChange (type, 1);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] > 0 ) {
            this.ingredientChange (type, -1);
        }
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
    
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabledInfo={disabledInfo}
                />
            </Aux>
        )
    }

}

export default BurgerBuilder;
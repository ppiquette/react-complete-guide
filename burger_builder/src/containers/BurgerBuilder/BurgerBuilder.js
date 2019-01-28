import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        totalPrice: 4.0,
        showSummary: false
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

    showSummaryHandler = () => {
        this.setState({showSummary: true})
    }

    render(){
        const disabledLess = {...this.state.ingredients};
        for (let key in disabledLess){
            disabledLess[key] = (disabledLess[key] <= 0);
        }

        let enableOrderNow = 0;
        const ingredients = {...this.state.ingredients};
        for (let key in ingredients){
            enableOrderNow += ingredients[key];
        }
 
        let modalSummary = null
        if(this.state.showSummary) {
            modalSummary = (
                <Modal>
                    <OrderSummary ingredients={{...this.state.ingredients}}></OrderSummary>
                </Modal>
            )
        }

        return (
            <Aux>
                {modalSummary}
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabledLess={disabledLess}
                    enableOrderNow={enableOrderNow}
                    price={this.state.totalPrice}
                    showSummary={this.showSummaryHandler}
                />
            </Aux>
        )
    }

}

export default BurgerBuilder;
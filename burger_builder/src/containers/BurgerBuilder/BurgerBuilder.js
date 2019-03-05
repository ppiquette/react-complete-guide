import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {withRouter} from 'react-router-dom'

const INGREDIENTS_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

// const valid_appstate = ["builder", "summary", "submitting"]

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        appstate: "builder",
    }

    componentDidMount(){
        Axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
    }

    computePrice = () => {
        let price = 4.0;
        if(this.state.ingredients){
            for(let key in this.state.ingredients){
                price += INGREDIENTS_PRICE[key] * this.state.ingredients[key];
            }
        }
        return price
    } 

    ingredientChange = (type, amount) => {
        let ingredientsCopy = {...this.state.ingredients};
        ingredientsCopy[type] += amount;
        this.setState({ingredients: ingredientsCopy});
    }
 
    addIngredientHandler = (type) => {
        this.ingredientChange (type, 1);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] > 0 ) {
            this.ingredientChange (type, -1);
        }
        console.log(this.props)
    }

    inSummary = (event) => {
        this.setState({appstate: "summary"})
    }

    cancelInSummary = () => {
        this.setState({appstate: "builder"})
    }

    summaryToCheckout = () => { 
        this.props.history.push({
            pathname: "/checkout",
            state:{
                ingredients: this.state.ingredients
            }
        });
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

        let totalPrice = this.computePrice();
 
        let orderSummary = (
            <OrderSummary 
                ingredients={{...this.state.ingredients}}
                cancelPurchase={this.cancelInSummary}
                continuePurchase={this.summaryToCheckout}
                price={totalPrice}
            />
        )
 
        let burgerElements = (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabledLess={disabledLess}
                    enableOrderNow={enableOrderNow}
                    price={totalPrice}
                    toSummary={this.inSummary}
                />
            </>
        )
 
        if(this.state.ingredients === null){
            burgerElements = (
                <Spinner/>
            )
        }


        return ( 
            <Aux>
                {/* To use the Transition defined in the modal.module.css, can add and remove 
                the Modal element from the DOM. It needs to be Transform (a css property)*/}
                <Modal 
                    show={this.state.appstate === "summary"}
                    backdropClicked={this.cancelInSummary}
                >
                    {orderSummary}
                </Modal>

                {burgerElements}
            </Aux>
        )
    }

}

export default withErrorHandler(withRouter(BurgerBuilder), Axios);
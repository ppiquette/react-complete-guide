import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        purchasing: false,
        loading: false
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

    purchasingHandler = () => {
        this.setState({purchasing: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Pat',
                address: {
                    address: 'HGJHV',
                    zipCode: '67765'
                },
                email: 'ytfty@.test.com'
            },
            deliveryMethod: 'asap'
        }
        // .json is because we use Google Firebase
        Axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
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
 
        let orderSummary = (
            <OrderSummary 
                ingredients={{...this.state.ingredients}}
                cancelPurchase={this.cancelPurchaseHandler}
                continuePurchase={this.continuePurchaseHandler}
                price={this.state.totalPrice}
            />
        )
        if (this.state.loading){
            orderSummary = (
                <Spinner></Spinner>
            )
        }

        return (
            <Aux>
                {/* To use the Transition defined in the modal.module.css, can add and remove 
                the Modal element from the DOM. It needs to be Transform (a css property)*/}
                <Modal 
                    show={this.state.purchasing}
                    backdropClicked={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabledLess={disabledLess}
                    enableOrderNow={enableOrderNow}
                    price={this.state.totalPrice}
                    purchasing={this.purchasingHandler}
                />
            </Aux>
        )
    }

}

export default withErrorHandler(BurgerBuilder, Axios);
import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Checkout from '../Checkout/Checkout';

const INGREDIENTS_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

const valid_appstate = ["builder", "summary", "checkout", "submitting"]

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
    }

    inSummary = () => {
        this.setState({appstate: "summary"})
    }

    cancelInSummary = () => {
        this.setState({appstate: "builder"})
    }

    inCheckout = () => {
        this.setState({appstate: "checkout"})
    }

    cancelInCheckout = () => {
        this.setState({appstate: "builder"})
    }

    summaryToCheckout = () => {
        this.setState({appstate: "checkout"})
    }

    purchaseHandler = () => {
        this.setState({summittingPurchase: true});
        const order = {
            ingredients: this.state.ingredients,
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
                this.setState({appstate: "builder"})
            })
            .catch(error => {
                this.setState({appstate: "builder"})
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
        if (this.state.summittingPurchase){
            orderSummary = (
                <Spinner/>
            )
        }

        let orderCheckout = (
            <Checkout
                ingredients={this.state.ingredients}
                checkout={this.purchaseHandler}
                returnToBuilder={this.cancelInCheckout}
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
            orderCheckout = null
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

                <Modal 
                    show={this.state.appstate === "checkout"}
                    backdropClicked={this.cancelInCheckout}
                >
                    {orderCheckout}
                </Modal>

                {burgerElements}
            </Aux>
        )
    }

}

export default withErrorHandler(BurgerBuilder, Axios);
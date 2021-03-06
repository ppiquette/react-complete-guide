import React , { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from './Burger'
import BuildControls from './BuildControls'
import Modal from '../UI/Modal'
import OrderSummary from './OrderSummary'
import Axios from '../../axios-orders';
import Spinner from '../UI/Spinner';
import { withRouter } from 'react-router-dom'
import { setIngredients } from '../../store/actions/ingredientsActions';
import { connect } from 'react-redux';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import {checkAuthentication} from '../../store/actions/authActions'


const INGREDIENTS_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    salad: 0.5,
    bacon: 0.7
}

// const valid_appstate = ["builder", "summary", "submitting"]

class BurgerBuilder extends Component {

    state = {
        appstate: "builder",
    }

    componentDidMount(){
        Axios.get('/ingredients.json')
        .then(response => {
            this.props.setIngredients(response.data);
        })

        this.props.checkAuth()
    }

    computePrice = () => {
        let price = 4.0;
        if(this.props.ingredients){
            for(let key in this.props.ingredients){
                price += INGREDIENTS_PRICE[key] * this.props.ingredients[key];
            }
        }
        return price
    } 

    ingredientChange = (type, amount) => {
        let ingredientsCopy = {...this.props.ingredients};
        ingredientsCopy[type] += amount;
        this.props.setIngredients(ingredientsCopy);
    }
 
    addIngredientHandler = (type) => {
        this.ingredientChange (type, 1);
    }

    removeIngredientHandler = (type) => {
        if(this.props.ingredients[type] > 0 ) {
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
            // I keep passing the new burger that way even if redux is now used in the app. Checkout.js 
            // could have also took a snapshot of the current state and add it in the list of burgers.
            newburger:{
                ingredients: this.props.ingredients
            }
        });
    }
    
    goToAuth = () => { 
        // I should send the burger that is currently in construction. Since I didn't connect the checkout component to the 
        // redux store, I would need to propagate the  burger in construction to redirect the user to /checkout. Fuck it.
        this.props.history.push({
            pathname: "/auth",
        });
    }

    render(){
        const disabledLess = {...this.props.ingredients};
        for (let key in disabledLess){
            disabledLess[key] = (disabledLess[key] <= 0);
        }

        let enableOrderNow = 0;
        const ingredients = {...this.props.ingredients};
        for (let key in ingredients){
            enableOrderNow += ingredients[key];
        }

        let totalPrice = this.computePrice();
 
        let orderSummary = (
            <OrderSummary 
                cancelPurchase={this.cancelInSummary}
                continuePurchase={this.summaryToCheckout}
                price={totalPrice}
            />
        )
 
        let burgerElements =  ( <Spinner/> )

        if(this.props.ingredients != null){
            burgerElements = (
                <>
                    <Burger />
                    <BuildControls 
                        ingredientRemoved={this.removeIngredientHandler}
                        ingredientAdded={this.addIngredientHandler}
                        disabledLess={disabledLess}
                        enableOrderNow={enableOrderNow}
                        price={totalPrice}
                        toSummary={this.props.isAuthenticated ? this.inSummary : this.goToAuth}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </>
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


// When receiving a new state
const mapStateToProps = (state) => {
    return {
        ingredients: state.app.ingredients,
        isAuthenticated: state.app.auth.token !== null,

    }
}
  
// To change the state
const mapDispatchToProps = (dispatch) => {
    return {
        setIngredients: (ingredients) => {dispatch(setIngredients(ingredients))},
        checkAuth: () => {dispatch(checkAuthentication())}
    }
}

// Need to wrap withRouter around redux (i.e. connect) otherwise get a warning
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
 )(withErrorHandler(BurgerBuilder, axiosInstance)))
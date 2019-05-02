import React, { Component } from 'react';

import { Provider,  } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import appReducer from './store/reducers/reducers';
import { reducer as formReducer } from 'redux-form'

// Middleware that allows asynchronous action
import ReduxThunk from 'redux-thunk'

import Layout from './components/Layout';
import BurgerBuilder from './components/Burger/BurgerBuilder'
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import Checkout from './components/Checkout/Checkout';
import NoFound from './components/UI/NoFound';
import Orders from './components/Order/Orders';
import Auth from './components/auth/Auth';
import logout from './components/auth/logout';


// Homemade middleware
const logger = (store) => {
    return((next) => {
        return ((action) => {
            // console.log('[MIDDLEWARE action] ', action);
            const result = next(action);
            // console.log('[MIDDLEWARE state] ', store.getState());
            return result;
        })
    })
}



// This is to use the redux extension https://github.com/zalmoxisus/redux-devtools-extension. Middleware 
// seems to be a simplify version of extension.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    app: appReducer,
    form: formReducer,
  })

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, ReduxThunk)));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/logout" component={logout} />
                            <Route path="/auth" component={Auth} />
                            <Route exact path="/" component={BurgerBuilder} />
                            <Route component={NoFound} />
                        </Switch>
                    
                    </Layout>
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;

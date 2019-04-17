import React, { Component } from 'react';
import Layout from './components/Layout';
import BurgerBuilder from './components/Burger/BurgerBuilder'
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import Checkout from './components/Checkout/Checkout';
import NoFound from './components/UI/NoFound';
import Orders from './components/Order/Orders';

import { Provider } from 'react-redux'
import { createStore, /*applyMiddleware,*/ compose } from 'redux'
import appReducer from './store/reducers';
import Auth from './components/auth/Auth';


// This is to use the redux extension https://github.com/zalmoxisus/redux-devtools-extension. Middleware 
// seems to be a simplify version of extension.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appReducer, composeEnhancers( /*applyMiddleware(...middleware)*/ ));

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
                            <Route exact path="/" component={BurgerBuilder} />
                            <Route path="/auth" component={Auth} />
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

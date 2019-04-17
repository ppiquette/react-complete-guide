import React, { Component } from 'react';
import Layout from './components/Layout';
import BurgerBuilder from './components/Burger/BurgerBuilder'
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import Checkout from './components/Checkout/Checkout';
import NoFound from './components/UI/NoFound';
import Orders from './components/Order/Orders';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducer from './reducers';

const store = createStore(appReducer)

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

import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router'
import Checkout from './containers/Checkout/Checkout';
import NoFound from './components/UI/NoFound/NoFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>

            <Switch>
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/" component={BurgerBuilder} />
              <Route component={NoFound} />
            </Switch>
          
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

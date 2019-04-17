import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';

// Middleware that allows asynchronous action
import ReduxThunk from 'redux-thunk'

// Homemade middleware
const logger = (store) => {
    return((next) => {
        return ((action) => {
            console.log('[MIDDLEWARE action] ', action);
            const result = next(action);
            console.log('[MIDDLEWARE state] ', store.getState());
            return result;
        })
    })
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, ReduxThunk)))

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));
registerServiceWorker();

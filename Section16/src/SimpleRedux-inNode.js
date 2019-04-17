// 
// 
// 
// This file is not attached to the rest of this folder project. Do the following to run:
// node src/SimpleRedux-inNode.js
// 
// 
// 

const redux = require('redux');
// const createStore = redux.createStore;

const initialState = {
    counter: 0,
    patate: 8,
}

// Reducer
const rootReducer = (state = initialState, action) => {
    let newValue = 0
    switch(action.type){
        case "INC_COUNTER":
            newValue = state.counter + 1;
            return { ...state, counter: newValue}
        
        case "ADD_COUNTER":
            newValue = state.counter + action.value;
            return { ...state, counter: newValue}
        
        default:
            return state;  
    }
}

// Create store
console.log("Create Store");
const store = redux.createStore(rootReducer);
console.log(store);
console.log(store.getState());

store.subscribe(() => {
    console.log("[subscribe]", store.getState())
})

// Dispatching actions
console.log("Dispatch some actions");
store.dispatch({type: "INC_COUNTER"});
store.dispatch({type: "ADD_COUNTER", value: 10});
console.log(store.getState());

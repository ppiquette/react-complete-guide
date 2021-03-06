
import { CHANGE_BY, STORE_COUNTER, REMOVE_COUNTER } from './actions'

const initState = {
    counter: 0,
    results: [],
}

const counterReducer = (state=initState, action) => {
    switch(action.type){
        case CHANGE_BY:
            return state + action.by
        default:
            return state;
    }
}

const resultsReducer = (state=initState, action) => {
    let newState = [...state]
    
    switch(action.type){
        case STORE_COUNTER:
            newState.push(action.counter) 
            return newState

        case REMOVE_COUNTER:
            // newState.splice(action.index, 1); or doing the following...
            newState = newState.filter((item, index) => {return (index !== action.index ? true : false)})
            return newState

        default:
            return state;
    }
}

const reducer = (state=initState, action) => {
    return {
        counter: counterReducer(state.counter, action),
        results: resultsReducer(state.results, action),
    };
}

export default reducer
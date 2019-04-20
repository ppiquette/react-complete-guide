
import {
    SET_INGREDIENTS,
} from './actions'



const initialAppState = {
    ingredients: {
    },
}


function ingredientsReducer(state = initialAppState.ingredients, action){
    switch (action.type){
        case SET_INGREDIENTS:
            return action.ingredients;

        default:
            return state;
    }
}

function appReducer (state = {}, action) {
    let newState = {
        ingredients: ingredientsReducer(state.ingredients, action),
    };
    return newState
}

export default appReducer
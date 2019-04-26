
import {
    SET_INGREDIENTS,
} from '../actions/ingredientsActions'



const initialState = {
}

export function ingredientsReducer(state = initialState, action){
    switch (action.type){
        case SET_INGREDIENTS:
            return action.ingredients;

        default:
            return state;
    }
}
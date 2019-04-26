
import { ingredientsReducer } from './ingredientsReducer'
import { authReducer } from './authReducer';

function appReducer (state = {}, action) {
    let newState = {
        ingredients: ingredientsReducer(state.ingredients, action),
        auth: authReducer(state.auth, action)
    };
    return newState
}

export default appReducer
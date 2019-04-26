
import {
    AUTH_SUCCESS, AUTH_FAIL, AUTH_START, AUTH_LOGOUT,
} from '../actions/authActions'



const initialState = {
    userId: null,
    token: null,
    error: null,
    loading: false,
}

export function authReducer(state = initialState, action){
    switch (action.type){
        case AUTH_START:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case AUTH_SUCCESS:
            return {
                userId: action.localId,
                token: action.idToken,
                error: null,
                loading: false,
            }

        case AUTH_FAIL:
            return {
                userId: null,
                token: null,
                error: action.message,
                loading: false,
            }

        case AUTH_LOGOUT:
            return initialState

        default:
            return state;
    }
}
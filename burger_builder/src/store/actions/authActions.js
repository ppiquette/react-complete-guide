import Axios from "axios";


// Action Types
export const AUTH_START = 'AUTH_START'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'


// 
// Action Creators
// 

export function logOut() {
    return {
        type: AUTH_LOGOUT,
    }
}

export function checkAuthTimeout(expirationTimeout) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTimeout)
    }
}

export function authStart() {
    return {
        type: AUTH_START,
    }
}

export function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        data: data,
        localId: data.localId,
        idToken: data.idToken,
    }
}

export function authFail(data) {
    return {
        type: AUTH_FAIL,
        data: data,
        message: data.response.data.error.message
    }
}

// the action that will actually do the authentication
export const auth = (email, password, signup) => {
    return dispatch => {
        dispatch(authStart());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDhlI-5YA19mTzxqRTA-QLnFNjWfLk_J9M"
        if (!signup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDhlI-5YA19mTzxqRTA-QLnFNjWfLk_J9M"
        }

        Axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true,
        })
        .then(response => {
            console.log(response);
            dispatch(checkAuthTimeout(response.data.expiresIn * 1000))
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        }) 
    }
}
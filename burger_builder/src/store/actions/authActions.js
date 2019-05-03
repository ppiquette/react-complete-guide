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
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId')
    
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

export function authSuccess(localId, idToken) {
    return {
        type: AUTH_SUCCESS,
        localId: localId,
        idToken: idToken,
    }
}

export function authFail(message) {
    return {
        type: AUTH_FAIL,
        message: message
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
            localStorage.setItem('idToken', response.data.idToken);
            const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("localId", response.data.localId);

            dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
            dispatch(authSuccess(response.data.localId, response.data.idToken));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error.message));
        }) 
    }
}

export const checkAuthentication = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        const expirationDate = new Date(localStorage.getItem('expirationDate')).getTime();
        const localId = localStorage.getItem('localId');

        const currentTime = new Date().getTime();
        if(currentTime < expirationDate){
            dispatch(authSuccess(localId, idToken));
            dispatch(checkAuthTimeout(expirationDate - currentTime));
        }
        else {
            dispatch(logOut());
        }
    }
}
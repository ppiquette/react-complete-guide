
import * as actionTypes from './actionTypes'


export const changeBy = (by) => {
    return {
        type:   actionTypes.CHANGE_BY,
        by:     by,
    }
}

export const syncStoreCounter = (counter) => {
    return {
        type:       actionTypes.STORE_COUNTER,
        counter:    counter,
    }
}

// This special action creator defers the actual dispatch of the real action that 
// will change the state. Here we are simulating accessing a remote server before 
// actually saving into redux. It has access to the dispatch function because of the 
// ReduxThunk middleware. It can also pass the getState function.
export const asyncStoreCounter = (counter) => {
    return ((dispatch) => {
        setTimeout(() => {
            dispatch(syncStoreCounter(counter))
        }, 2000)
    })
}

export const removeCounter = (index) => {
    return {
        type:     actionTypes.REMOVE_COUNTER,
        index:    index,
    }
}

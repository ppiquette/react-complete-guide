
export const CHANGE_BY = 'CHANGE_BY'
export const STORE_COUNTER = 'STORE_COUNTER'
export const REMOVE_COUNTER = 'REMOVE_COUNTER'


export const changeBy = (by) => {
    return {
        type:   CHANGE_BY,
        by:     by,
    }
}
export const storeCounter = (counter) => {
    return {
        type:       STORE_COUNTER,
        counter:    counter,
    }
}

export const removeCounter = (index) => {
    return {
        type:     REMOVE_COUNTER,
        index:    index,
    }
}

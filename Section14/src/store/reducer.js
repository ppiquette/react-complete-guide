
import { CHANGE_BY } from './actions'

const initState = {
    counter: 0,
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case CHANGE_BY:
            return {
                ...state,
                counter: state.counter + action.by,
            }
        default:
            return state;
    }
}

export default reducer
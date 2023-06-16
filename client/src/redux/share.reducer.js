import {defaultState} from "./default.state";
import {CHANGE_SHARE} from "./constants";

export const shareReducer = (state = defaultState, action) => {
    switch (action.type){
        case CHANGE_SHARE:
            return {...state,
                    values: action.payload.values,
                    labels: action.payload.labels,
                    company: action.payload.company
            }
        default:
            return state
    }
}
import {defaultState} from "./default.state";
import {SET_CUR_COURSE, SET_CUR_DATE, SET_END} from "./constants";

export const tradingReducer = (state = defaultState, action) => {
    switch (action.type){
        case SET_CUR_DATE:
            return {...state, currentDate: action.payload}
        case SET_CUR_COURSE:
            return {...state, currentCourse: [...action.payload]}
        case SET_END:
            return {...state, tradingEnded: action.payload}
        default:
            return state
    }
}
import {defaultState} from "./default.state";
import {ADD_SHARE, DELETE_SHARE, GET_DATES, SET_SHIFT, SET_START} from "./constants";

export const settingsReducer = (state = defaultState, action) => {
    switch (action.type){
        case GET_DATES:
            return {...state, settingsDates: [...action.payload]}
        case SET_START:
            return {...state, start: action.payload}
        case SET_SHIFT:
            return {...state, shift: action.payload}
        case ADD_SHARE:
            return {...state, tradingShares: [...state.tradingShares, action.payload]}
        case DELETE_SHARE:
            return {...state, tradingShares: state.tradingShares.filter(item => item !== action.payload)}
        default:
            return state
    }
}
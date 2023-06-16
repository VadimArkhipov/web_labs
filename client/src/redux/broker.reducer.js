import {defaultState} from "./default.state";
import {ADD_BROKER, DELETE_BROKER, LOAD_BROKERS} from "./constants";

export const brokerReducer = (state = defaultState, action) => {
    switch (action.type){
        case LOAD_BROKERS:
            return {...state, brokers: [...action.payload]}
        case DELETE_BROKER:
            return {...state, brokers: state.brokers.filter(item => item.id !== action.payload.id)}
        case ADD_BROKER:
            return {...state, brokers: [...state.brokers, action.payload]}
        default:
            return state
    }
}
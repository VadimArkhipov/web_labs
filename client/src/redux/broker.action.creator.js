import {ADD_BROKER, DELETE_BROKER, LOAD_BROKERS} from "./constants";

export function actionLoad(payload){
    return {
        type: LOAD_BROKERS,
        payload: payload
    }
}

export function actionAdd(payload){
    return {
        type: ADD_BROKER,
        payload: payload
    }
}

export function actionDelete(payload){
    return {
        type: DELETE_BROKER,
        payload: payload
    }
}
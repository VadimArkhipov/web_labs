import {ADD_SHARE, DELETE_SHARE, GET_DATES, SET_SHIFT, SET_START} from "./constants";

export function actionGetDates(payload){
    return {
        type: GET_DATES,
        payload: payload
    }
}

export function actionSetStart(payload){
    return {
        type: SET_START,
        payload: payload
    }
}

export function actionSetShift(payload){
    return {
        type: SET_SHIFT,
        payload: payload
    }
}

export function actionAddShare(payload){
    return {
        type: ADD_SHARE,
        payload: payload
    }
}

export function actionDeleteShare(payload){
    return {
        type: DELETE_SHARE,
        payload: payload
    }
}

export function actionRefreshShift(){
    return {
        type: SET_SHIFT,
        payload: 5
    }
}

export function actionRefreshStart(){
    return {
        type: SET_START,
        payload: "01/04/2021"
    }
}
import {SET_CUR_COURSE, SET_CUR_DATE, SET_END} from "./constants";

export function actionSetCurDate(payload){
    return {
        type: SET_CUR_DATE,
        payload: payload
    }
}

export function actionSetCurCourse(payload){
    return {
        type: SET_CUR_COURSE,
        payload: payload
    }
}

export function actionSetEnd(payload){
    return {
        type: SET_END,
        payload: payload
    }
}
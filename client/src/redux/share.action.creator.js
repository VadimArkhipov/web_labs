import {CHANGE_SHARE} from "./constants";

export function actionChangeShare(payload, company) {
    return {
        type: CHANGE_SHARE,
        payload: {
            labels: payload.labels,
            values: payload.values,
            company: company
        }
    }
}
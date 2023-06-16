import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {brokerReducer} from "./broker.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {shareReducer} from "./share.reducer";
import {settingsReducer} from "./settings.reducer";
import {tradingReducer} from "./trading.reducer";

const rootReducer = combineReducers({
    brokerReducer: brokerReducer,
    shareReducer: shareReducer,
    settingsReducer: settingsReducer,
    tradingReducer: tradingReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
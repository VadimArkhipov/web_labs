import React, {useEffect} from 'react';
import "./settings-component.css"
import {useDispatch, useSelector} from "react-redux";
import {
    actionAddShare,
    actionDeleteShare,
    actionGetDates,
    actionSetShift,
    actionSetStart
} from "../redux/settings.action.creator";

const SettingsComponent = () => {

    const dispatch = useDispatch()
    const dates = useSelector(state => state.settingsReducer.settingsDates)
    const shift = useSelector(state => state.settingsReducer.shift)
    const tradingShares = useSelector(state => state.settingsReducer.tradingShares)

    const fetchDates = () => {
        return function (dispatch){
            fetch("http://localhost:3100/getDates", {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        dispatch(actionGetDates(result.dates))
                    }
                )
        }
    }

    const handlerClick = (event) => {
        if (tradingShares.filter(item => item === event.target.id).length){
            dispatch(actionDeleteShare(event.target.id))
        } else {
            dispatch(actionAddShare(event.target.id))
        }
    }

    useEffect(() => {
        dispatch(fetchDates())
    }, [])

    return (
        <div className="set">
            <h1 style={{textAlign: "center"}}>Настройки</h1>
            <div className="start-trading">
                <label>Начало торгов</label><br/>
                <select name="start" onChange={event => {
                    dispatch(actionSetStart(event.target.value))
                }} className="start-select">
                    {
                        dates.map(item => (
                            <option key={String(item)}>{item}</option>
                        ))
                    }
                </select>
            </div>
            <div className="shift-speed">
                <label>Скорость смены дат</label><br/>
                <input className="shift-input" type="number"
                       onChange={event => dispatch(actionSetShift(Number(event.target.value)))}
                       value={shift} min={1} step={1} max={60} />
            </div>
            <div style={{textAlign: "center", marginTop: "8px"}}>
                <label>Доступные акции</label>
            </div>
            <div className="choose-table">
                <div style={{height: "10px"}}></div>
                <div className="row">
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "aapl").length ? 'chosen' : ''}`}
                                id="aapl">
                            AAPL
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "sbux").length ? 'chosen' : ''}`}
                                id="sbux">
                            SBUX
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "msft").length ? 'chosen' : ''}`}
                                id="msft">
                            MSFT
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "csco").length ? 'chosen' : ''}`}
                                id="csco">
                            CSCO
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "qcom").length ? 'chosen' : ''}`}
                                id="qcom">
                            QCOM
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "amzn").length ? 'chosen' : ''}`}
                                id="amzn">
                            AMZN
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "tsla").length ? 'chosen' : ''}`}
                                id="tsla">
                            TSLA
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick}
                                className={`${tradingShares.filter(item => item === "amd").length ? 'chosen' : ''}`}
                                id="amd">
                            AMD
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsComponent;
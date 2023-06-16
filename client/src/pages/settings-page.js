import React, {useEffect, useState} from 'react';
import "./settings-page.css"
import NavbarComponent from "../components/navbar-component";
import SettingsComponent from "../components/settings-component";
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client"
import {actionSetCurCourse, actionSetCurDate, actionSetEnd} from "../redux/trading.action.creator";
import CourseInfoComponent from "../components/course-info-component";
import {actionDeleteShare, actionRefreshShift, actionRefreshStart} from "../redux/settings.action.creator";


const SettingsPage = () => {

    const [socket] = useState(io("http://localhost:9999"));

    const dispatch = useDispatch()
    const shift = useSelector(state => state.settingsReducer.shift)
    const start = useSelector(state => state.settingsReducer.start)
    const tradingShares = useSelector(state => state.settingsReducer.tradingShares)

    const [tradingStarted, setTradingStarted] = useState(false)
    const tradingEnded = useSelector(state => state.tradingReducer.tradingEnded)

    const startTrades = () => {
        setTradingStarted(true)
        console.log(tradingShares);
        socket?.emit("trading", {
            shift: shift,
            start: start,
            tradingShares: tradingShares
        })
    }

    useEffect(()=>{
        socket?.on("course-changed", (courses, date)=>{
            console.log(courses, date);
            dispatch(actionSetCurCourse(courses))
            dispatch(actionSetCurDate(date))
            setTradingStarted(true)
        })
        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        socket?.on("end", () => {
            setTradingStarted(false);
            console.log(tradingEnded, tradingStarted);
            console.log(tradingShares);
            console.log('заканчиваем торги')
            console.log(tradingShares);
            tradingShares.map(elem => {dispatch(actionDeleteShare(elem));
                console.log(elem)})
        });
        // eslint-disable-next-line
    }, [])

    const endTrades = () => {
        socket?.emit("stoptrading");
        dispatch(actionSetEnd(true))
        setTradingStarted(false)
        setTimeout(()=>{
            dispatch(actionSetEnd(false))
            dispatch(actionRefreshShift())
            dispatch(actionRefreshStart())
        }, shift*1)
    }

    return (
        <div className="body">
            <NavbarComponent />
            {
                !tradingStarted && !tradingEnded && <SettingsComponent />
            }
            <div className="btn-wrap">
                {
                    !tradingStarted && !tradingEnded &&
                    <button disabled={!(shift >= 1 && shift <= 60) || !tradingShares.length}
                            onClick={startTrades} className="trading">
                        Начать!
                    </button>
                }
                {
                    tradingStarted && !tradingEnded &&
                    <button onClick={endTrades} className="trading">
                        Остановить!
                    </button>
                }
            </div>
            {
                tradingStarted && !tradingEnded && <CourseInfoComponent />
            }
        </div>

    );
};

export default SettingsPage;
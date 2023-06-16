import React, {useState} from 'react';
import "./shares-list-page.css"
import NavbarComponent from "../components/navbar-component";
import ShareChartComponent from "../components/share-chart-component";
import ShareTableComponent from "../components/share-table-component";
import {useDispatch} from "react-redux";
import {actionChangeShare} from "../redux/share.action.creator";

const SharesListPage = () => {

    const dispatch = useDispatch()
    const [picked, setPicked] = useState("")

    const handlerClick = (event) => {
        setPicked(event.target.id);
        if(event.target.className === 'chosen'){
            console.log('Это уже было');
            setPicked("");
        }
        fetch("http://localhost:3100/share/" + event.target.id, {
            method: "GET"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(actionChangeShare(result, event.target.id))
                }
            )
    }

    return (
        <div className="body">
            <NavbarComponent />
            <div className="choose-table">
                <div className="row">
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "aapl" ? 'chosen' : 'share'}`} id="aapl">
                            AAPL
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "sbux" ? 'chosen' : 'share'}`} id="sbux">
                            SBUX
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "msft" ? 'chosen' : 'share'}`} id="msft">
                            MSFT
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "csco" ? 'chosen' : 'share'}`} id="csco">
                            CSCO
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "qcom" ? 'chosen' : 'share'}`} id="qcom">
                            QCOM
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "amzn" ? 'chosen' : 'share'}`} id="amzn">
                            AMZN
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "tsla" ? 'chosen' : 'share'}`} id="tsla">
                            TSLA
                        </button>
                    </div>
                    <div className="cell">
                        <button onClick={handlerClick} className={`${picked === "amd" ? 'chosen' : 'share'}`} id="amd">
                            AMD
                        </button>
                    </div>
                </div>
            </div>

            {
                picked && <ShareChartComponent />
            }
            {
                picked && <ShareTableComponent />
            }
        </div>
    );
};

export default SharesListPage;
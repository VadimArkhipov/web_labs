import React from 'react';
import "./share-table-component.css"
import {useSelector} from "react-redux";

const ShareTableComponent = () => {

    const company = useSelector(state => state.shareReducer.company)
    const labels = useSelector(state => state.shareReducer.labels)
    const values = useSelector(state => state.shareReducer.values)

    function merge(labels, values) {
        const res = [];
        // for (let i = labels.length-1; i >= 0; i--) {
        //     res.push([labels[i], values[i]]);
        // }
        for(let i = 0; i<labels.length; i++){
            res.push([labels[i], values[i]]);
        }
        return res;
    }

    return (
        <div className="table">
            <table className="share-table">
            <caption>Таблица {company}</caption>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                {
                    merge(labels, values, 4).map(item => (
                        <tr key={new Date().getMilliseconds() * item[1] / parseFloat(item[0].split("/")[1]) + Math.random()*10}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default ShareTableComponent;
import React from 'react';
import "./broker-component.css"

const BrokerComponent = (props) => {
    return (
        <div className="broker">
            <div className="broker-info">
                <div className="broker-name" title={"id: " + props.broker.id}>
                    Имя: {props.broker.name}
                </div>
                <div className="broker-balance">
                    Счёт: {props.broker.balance}
                </div>
            </div>
            <button onClick={() => props.click(props.broker)} className="delete">Удалить</button>
        </div>
    );
};

export default BrokerComponent;
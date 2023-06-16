import React, {useEffect, useState} from "react";
import "./brokers-page.css"
import NavbarComponent from "../components/navbar-component";
import BrokerComponent from "../components/broker-component";
import {useDispatch, useSelector} from "react-redux";
import {actionAdd, actionDelete, actionLoad} from "../redux/broker.action.creator";

function BrokersPage (){

    const dispatch = useDispatch()
    const brokers = useSelector(state => state.brokerReducer.brokers)

    const [name, setName] = useState("")
    const [balance, setBalance] = useState(3000)
    const [nameValid, setNameValid] = useState(false)
    const [balanceValid, setBalanceValid] = useState(true)

    const fetchBrokers = () => {
        return function (dispatch){
            fetch("http://localhost:3100/brokers", {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        dispatch(actionLoad(result))
                    }
                )
        }
    }

    useEffect(() => {
        dispatch(fetchBrokers())
        // eslint-disable-next-line
    }, []);

    const onChangeBalance = (event) => {
        setBalance(Number(event.target.value))
        if (event.target.value >= 0){
            setBalanceValid(true)
        }
        else {
            setBalanceValid(false)
        }
    }

    const deleteBroker = (broker) => {
        dispatch(actionDelete(broker))
        fetch("http://localhost:3100/deleteBroker", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(broker)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const onChangeName = (event) => {
        setName(event.target.value)
        if (event.target.value.split(" ").length - 1 < event.target.value.length && event.target.value.length > 0){
            setNameValid(true)
        }
        else {
            setNameValid(false)
        }
    }

    const addNewBroker = (event) => {
        event.preventDefault()
        const newBroker = {
            name: name.trim(),
            balance: balance,
            id: Date.now()
        }
        dispatch(actionAdd(newBroker))
        setNameValid(false)
        fetch("http://localhost:3100/setBroker", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBroker)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setBalance(100)
                    setName("")
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <div className="body">
            <NavbarComponent/>
            <form className="add-form">
                <div className="name-input">
                    <label>Имя</label><br/>
                    <input autoComplete="off"
                           type="text"
                           onChange={onChangeName}
                           value={name}
                           name="name"/>
                </div>
                <div className="balance-input">
                    <label>Счёт</label><br/>
                    <input autoComplete="off"
                           step="100"
                           onChange={onChangeBalance}
                           type="number"
                           value={balance}
                           name="balance"/>
                </div>
                <button disabled={!(nameValid && balanceValid)} onClick={addNewBroker} className="add">
                    Добавить брокера
                </button>
            </form>
            <h1 style={{textAlign: "center"}}>Брокеры</h1>
            {
                brokers.map(item => (
                    <BrokerComponent broker={item} key={item.id} click={deleteBroker} />
                ))}
        </div>
    )

}

export default BrokersPage
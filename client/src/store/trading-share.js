export default {
    actions: {

    },
    mutations: {
        setChosen(state, share) {
            state.chosen = share
        },
        setAmount(state, amount){
            state.amount = amount
        },
        setCost(state, cost){
            state.cost = cost
        },
        setBalance(state, balance) {
            state.balance = balance
        },
        refreshCost(state) {
            state.cost = 0
        },
        refreshChosen(state) {
            state.chosen = ""
        },
        refreshAmount(state) {
            state.amount = 1
        },
        decreaseBalance(state, deduction) {
            state.balance = parseFloat((state.balance - deduction).toFixed(4))
        },
        increaseBalance(state, raise) {
            state.balance = parseFloat((state.balance + raise).toFixed(4))
        }
    },
    state: {
        cost: 0,
        chosen: "",
        amount: 1,
        balance: 0
    },
    getters: {
        getCost(state) {
            return state.cost
        },
        getChosen(state){
            return state.chosen
        },
        getAmount(state) {
            return state.amount
        },
        getBalance(state) {
            return state.balance
        }
    }
}
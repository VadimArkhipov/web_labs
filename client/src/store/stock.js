export default {
    actions: {

    },
    mutations: {
        addShare(state, share){
            for (let x = 0; x < state.stock.length; x++){
                if (state.stock[x][0] === share.share){
                    state.stock[x][1] += parseInt(share.amount)
                    break
                }
            }
            state.purchases = [...state.purchases, {share: share.share, amount: share.amount, date: share.date, cost: share.cost}]
        },
        removeShare(state, share) {
            for (let x = 0; x < state.stock.length; x++){
                if (state.stock[x][0] === share.share){
                    state.stock[x][1] -= parseInt(share.amount)
                    break
                }
            }
            let purchases = state.purchases
            let amount = parseInt(share.amount)
            for (let x = 0; x < purchases.length; x++){
                if (purchases[x].share === share.share){
                    while (purchases[x].amount > 0 && amount > 0){
                        purchases[x].amount -= 1
                        amount -= 1
                        if (!amount){
                            if (!purchases[x].amount){
                                purchases.splice(x, 1)
                            }
                            break
                        } else {
                            if (!purchases[x].amount){
                                purchases.splice(x, 1)
                                x--
                                break
                            }
                        }
                    }
                }
            }
            state.purchases = [...purchases]
        },
        setPurchases(state, purchases) {
            state.purchases = [...purchases]
        }
    },
    state: {
        stock: [
            ["aapl", 0],
            ["sbux", 0],
            ["msft", 0],
            ["csco", 0],
            ["qcom", 0],
            ["amzn", 0],
            ["tsla", 0],
            ["amd",  0]],
        purchases: []
    },
    getters: {
        getStock(state) {
            return state.stock
        },
        getPurchases(state) {
            return state.purchases
        },
        getDataForTable(state, getters){
            let data = [];
            for(let company of getters.getStock){
                let amount = 0;
                getters.getPurchases.filter(elem => elem.share === company[0]).forEach(elem => amount += Number(elem.amount));
                data.push([company[0], amount]);
            }
            return data;

        }
    }
}
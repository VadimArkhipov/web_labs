export default {
    actions: {

    },
    mutations: {
        setLoggedIn(state, user) {
            state.user = user
        }
    },
    state: {
        user: ""
    },
    getters: {
        isLoggedIn(state) {
            return !!state.user
        },
        getUser(state) {
            return state.user
        }
    }
}
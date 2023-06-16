export default {
    actions: {

    },
    mutations: {
        // Загрузка пользователей
        loadUsers(state, users) {
            state.users = [...users]
        },
        // Загрузка акций всех пользователей
        loadUsersStock(state, usersStock) {
            state.usersStock = usersStock;
        },
        addUser(state, user) {
            state.users = [...state.users, user]
        }
    },
    state: {
        users: [],
        usersStock: {
        }
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getUsersStock(state) {
            return state.usersStock
        }
    }
}
export default {
    actions: {

    },
    mutations: {
        setCourse(state, course) {
            state.course = course
        },
        setDate(state, date) {
            state.date = date
        },
        refreshCourse(state) {
            state.course = []
        },
        refreshDate(state) {
            state.date = '';
        }
    },
    state: {
        date: "",
        course: []
    },
    getters: {
        getCourse(state) {
            return state.course
        },
        getDate(state) {
            return state.date
        },
        availableShares(state) {
            return state.course.map(course => {return course[0]})
        }
    }
}